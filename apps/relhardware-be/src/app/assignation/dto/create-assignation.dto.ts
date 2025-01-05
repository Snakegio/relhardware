import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAssignationDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  itemIds: number[];
  @IsOptional()
  creationDate?: Date;
  @IsOptional()
  modificationDate?: Date;
  @IsOptional()
  note: string;
}
