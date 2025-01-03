import {
  IAssignationDto,
  ICompanyDto,
  IItem,
  IItemTypeDto,
} from '@relhardware/dto-shared';

export class ItemResponseDto implements IItem {
  id: number;
  itemType: IItemTypeDto;
  internalCode: string;
  model: string;
  serviceTag: string;
  contract: string;
  dockingStation: boolean;
  productNumber: string;
  macAddress: string;
  creationDate?: Date;
  modificationDate?: Date;
  idCompany?: ICompanyDto;
  assignation?: IAssignationDto;
}
