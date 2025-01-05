import { IItemType } from '@relhardware/dto-shared';

export class ItemTypeResponseDto implements IItemType {
  id: number;
  name: string;
}
