import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAssignationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  @IsNumber()
  itemIds: number[];
  @IsOptional()
  @IsDate()
  creationDate?: Date;

  @IsOptional()
  @IsDate()
  modificationDate?: Date;

  @IsOptional()
  note: string;
}
