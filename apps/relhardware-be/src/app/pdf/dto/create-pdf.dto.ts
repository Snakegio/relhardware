import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsNumber()
  assignationId: number;
}
