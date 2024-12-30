import { PartialType } from '@nestjs/swagger';
import { CreateAssignationDto } from './create-assignation.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAssignationDto extends PartialType(CreateAssignationDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
