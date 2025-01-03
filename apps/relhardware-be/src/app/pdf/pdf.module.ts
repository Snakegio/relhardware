import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignation } from '../assignation/entities/assignation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignation])],
  controllers: [PdfController],
  providers: [PdfService],
})
export class PdfModule {}
