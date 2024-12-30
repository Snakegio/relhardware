import { PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';
import { IsNumber } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsNumber()
  id: number;
}
