import {
  IAssignationDto,
  ICompanyDto,
  IItemDto,
  IItemTypeDto,
} from '@relhardware/dto-shared';

export class ItemResponseDto implements IItemDto {
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
