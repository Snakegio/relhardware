import {
  IAssignationDto,
  ICompany,
  IItem,
  IItemType,
} from '@relhardware/dto-shared';

export class ItemResponseDto implements IItem {
  id: number;
  itemType: IItemType;
  internalCode: string;
  model: string;
  serviceTag: string;
  contract: string;
  dockingStation: boolean;
  productNumber: string;
  macAddress: string;
  creationDate?: Date;
  modificationDate?: Date;
  company: ICompany;
  assignation?: IAssignationDto;
}
