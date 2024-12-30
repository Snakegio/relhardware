import { IsNotEmpty } from 'class-validator';

export class CreateItemTypeDto {
  @IsNotEmpty()
  name: string;
}
