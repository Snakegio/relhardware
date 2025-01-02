import { IItemTypeDto } from '@relhardware/dto-shared';

export class ItemTypeResponseDto implements IItemTypeDto {
  id: number;
  name: string;
}
