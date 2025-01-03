import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateAssignationDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @IsNotEmpty()
  itemIds: number[];
  @IsOptional()
  creationDate?: Date;

  @IsOptional()
  modificationDate?: Date;

  @IsOptional()
  note: string;
}
