import { Body, Controller, Post, Req } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { CreatePdfDto } from './dto/create-pdf.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('pdf')
// @UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post()
  create(@Req() request: Request, @Body() createPdfDto: CreatePdfDto) {
    return this.pdfService.create(createPdfDto, request['user']);
  }

  // @Get('generate')
  // generatePdf(@Res() res: Response) {
  //   const data = [
  //     {
  //       tipoModello: 'PC Macbook Pro A2141',
  //       serviceTag: 'C02G4A2SMD6R',
  //       note: 'Nessuna',
  //     },
  //   ];
  //
  //   const pdfBuffer = this.pdfService.generatePdf(data);
  //
  //   res.set({
  //     'Content-Type': 'application/pdf',
  //     'Content-Disposition': 'attachment; filename="assegnazione.pdf"',
  //     'Content-Length': pdfBuffer.length,
  //   });
  //
  //   res.send(pdfBuffer);
  // }

  //   @Get()
  //   findAll() {
  //     return this.pdfService.findAll();
  //   }
  //
  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.pdfService.findOne(+id);
  //   }
  //
  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.pdfService.remove(+id);
  //   }
}
