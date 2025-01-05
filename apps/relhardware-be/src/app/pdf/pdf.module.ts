import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { PdfController } from './pdf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignation } from '../assignation/entities/assignation.entity';
import { UserService } from '../users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignation])],
  controllers: [PdfController],
  providers: [PdfService,UserService],
})
export class PdfModule {}
