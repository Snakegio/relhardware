import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePdfDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  assignationId: number;
}
