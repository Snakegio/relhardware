import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { Response } from 'express';
import PdfPrinter from 'pdfmake';
import path, { join } from 'path';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Assignation } from '../assignation/entities/assignation.entity';
import { readFileSync } from 'fs';
import { PdfTableDto } from './dto/pdf-table.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name, { timestamp: true });

  constructor(
    @InjectRepository(Assignation)
    private readonly assignationRepository: Repository<Assignation>,
    private readonly userService: UserService,
  ) {}

  async create(
    createPdfDto: CreatePdfDto,
    loggedUser: UserResponseDto,
    response: Response
  ) {
    this.logger.debug(
      'Creating PDF report for assignation {}',
      JSON.stringify(createPdfDto)
    );
    const assignation = await this.assignationRepository.findOne({
      where: { id: createPdfDto.assignationId },
      relations: ['user', 'items'] // Specifica la relazione da caricare
    });
    if (!assignation) {
      throw new Error('Assignation not found');
    }
    this.logger.debug('Assignation found', JSON.stringify(assignation));
    this.logger.debug('loggedUser found', JSON.stringify(loggedUser));
    const pdf = await this.generateDynamicPdf(
      this.getImageBase64('assets/images/logo-white.png'),
      'Assegnazione Sistemi Informatici Aziendali',
      `prova ${loggedUser.firstName} ${loggedUser.lastName}`,
      this.generateTableDto(assignation),
      'Sesto san Giovanni'
    );
    const user= await this.userService.findById(assignation.user);
    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${user.firstName} ${user.lastName}.pdf"`
    );

    pdf.pipe(response);
    pdf.end();
  }

  async generateDynamicPdf(
    logo: string, // Base64 o URL
    title: string,
    description: string,
    table: PdfTableDto[], // Array di oggetti per righe della tabella
    place: string
  ) {
    const fonts = {
      Roboto: {
        normal: path.join(__dirname, 'assets/fonts/Roboto-Regular.ttf'),
        bold: path.join(__dirname, 'assets/fonts/Roboto-Medium.ttf'),
        italics: path.join(__dirname, 'assets/fonts/Roboto-Italic.ttf'),
        bolditalics: path.join(
          __dirname,
          'assets/fonts/Roboto-MediumItalic.ttf'
        )
      }
    };
    const printer = new PdfPrinter(fonts);
    // Definizione del documento
    const docDefinition: TDocumentDefinitions = {
      content: [
        {
          columns: [
            logo
              ? {
                  image: `data:image/png;base64,${logo}`,
                  width:110,
                }
              : {},
            // Titolo
            {
              text: title,
              style: 'header',
              margin: [0, 10,0, 0],
           }, // Logo
         ],
        },

        // Descrizione
        {
          text: description,
          margin: [0, 20, 0, 20],
        },

        // Tabella Dinamica
        this.buildTable(table),

        {
          columns: [
            // Luogo
            {
              text: `Luogo: ${place}`,
              alignment: 'left',
              margin: [0, 20,0, 0],
            },
            // Firma
            {
              text: `Firma:`,
              alignment: 'right',
              margin: [0, 20, 10, 0],
           },
         ],
       },
      ],
      styles: {
        header: {
          fontSize: 16,
          bold:true,
        },
        subheader: {
          fontSize: 10,
        },
        tableHeader: {
          bold: true,
          fontSize: 12,
          color: 'lack',
       },
     },
    };

    // Creazione del PDF
    return printer.createPdfKitDocument(docDefinition);
  }

  private buildTable(data: PdfTableDto[]): any {
    if (!data.length) {
      return { text: 'Nessun dato disponibile.', margin: [0, 10, 0, 10] };
    }

    // Creazione delle intestazioni con trasformazione capitalized
    const headers = Object.keys(data[0]).map((header) => header.toUpperCase());

    return {
      table: {
        headerRows: 1,
        widths: Array(headers.length).fill('*'),
        body: [
          // Intestazioni capitalized
          headers.map((header) => ({ text: header, style: 'tableHeader' })),

          // Righe della tabella
          ...data.map((row) =>
            Object.keys(data[0]).map((key) => row[key] || '')
          )
        ]
      },
      layout: 'lightHorizontalLines',
      margin: [0, 20, 0, 20]
    };
  }

  private getImageBase64(filePath: string): string {
    const imagePath = join(__dirname, filePath); // Percorso relativo
    const imageBuffer = readFileSync(imagePath);
    return imageBuffer.toString('base64');
  }

  private generateTableDto(assignation: Assignation): PdfTableDto[] {
    const tableDto: PdfTableDto[] = [];
    for (const item of assignation.items) {
      tableDto.push({
        type: item.itemType.name,
        model: item.model,
        serviceTag: item.serviceTag || ''
      });
    }
    return tableDto;
  }
}
