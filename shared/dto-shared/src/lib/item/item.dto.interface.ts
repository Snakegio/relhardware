import { IItemType } from '../item-type/item-type.dto.interface';
import { IAssignationDto } from '../assignation/assignation.dto.interface';
import { ICompany } from '../company/company.dto.interface';

export interface IItem {
  id?: number;
  itemType: IItemType;
  internalCode?: string;
  model: string;
  serviceTag: string;
  contract?: string;
  dockingStation?: boolean;
  productNumber?: string;
  macAddress?: string;
  creationDate?: Date;
  modificationDate?: Date;
  company: ICompany;
  assignation?: IAssignationDto;
}
