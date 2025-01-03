import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PdfResponseDto } from './dto/pdf-response.dto';
import { User } from '../users/entities/user.entity';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { Item } from '../item/entities/item.entity';

@Injectable()
export class PdfService {
  private readonly logger = new Logger(PdfService.name, { timestamp: true });

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>
  ) {}

  async create(
    createPdfDto: CreatePdfDto,
    loggedUser: User
  ): Promise<PdfResponseDto> {
    this.logger.debug('Creating PDF report', JSON.stringify(createPdfDto));
    //todo insert generation pdf here
    // const user = await this.userRepository.findOneBy({
    //   id: createPdfDto.userId,
    // });
    // const items = await this.itemRepository.findBy({
    //   id: In(createPdfDto.itemsId),
    // });
    console.log('loggedUser', loggedUser);
    return null;
    // return plainToInstance(
    //   PdfResponseDto,
    //   await this.pdfReportRepository.save(pdfReport)
    // );
  }

  // async findOne(id: number): Promise<PdfResponseDto> {
  //   const pdfReport = await this.pdfReportRepository.findOneBy({ id });
  //   if (!pdfReport) {
  //     throw new NotFoundException(`PDF Report with ID ${id} not found`);
  //   }
  //   this.logger.debug('Found PDF report', JSON.stringify(pdfReport));
  //   return plainToInstance(PdfResponseDto, pdfReport);
  // }
  //
  // async remove(id: number): Promise<void> {
  //   const result = await this.pdfReportRepository.delete(id);
  //   if (result.affected === 0) {
  //     throw new NotFoundException(`PDF Report with ID ${id} not found`);
  //   }
  //   this.logger.debug('Removed PDF report with ID', id);
  // }

  // generatePdf(data: any[]): Buffer {
  //   const doc = new jsPDF();
  //
  //   // Aggiungi il titolo e l'intestazione
  //   doc.setFontSize(12);
  //   doc.text('ASSEGNAZIONE SISTEMI INFORMATIVI AZIENDALI', 10, 10);
  //   doc.setFontSize(10);
  //   doc.text('Conformemente al regolamento per l’utilizzo...', 10, 20);
  //
  //   // Aggiungi i dettagli principali
  //   doc.text(`Assegnazione`, 10, 30);
  //   doc.text(`In data: ${new Date().toLocaleDateString()}`, 10, 40);
  //   doc.text(`Assegna a: Giorgio Privitera`, 10, 50);
  //
  //   // Tabella dinamica
  //   autoTable(doc, {
  //     startY: 60,
  //     head: [['TIPO MODELLO', 'SERVICE TAG', 'NOTE']],
  //     body: data.map(item => [item.tipoModello, item.serviceTag, item.note]),
  //   });
  //
  //   // Spazio per firma con margine statico
  //   const marginAfterTable = 80; // Altezza statica dopo la tabella
  //   const yPosition = 60 + marginAfterTable;
  //
  //   doc.text('Luogo e data: Sesto San Giovanni', 10, yPosition);
  //   doc.text('Firma:', 10, yPosition + 10);
  //   doc.line(30, yPosition + 10, 100, yPosition + 10); // Linea per la firma
  //
  //   // Converte l'ArrayBuffer in un Buffer
  //   const arrayBuffer = doc.output('arraybuffer');
  //   return Buffer.from(arrayBuffer);  }
}
