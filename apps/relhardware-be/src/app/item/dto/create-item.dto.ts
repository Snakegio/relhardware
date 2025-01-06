import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ICompany, IItem, IItemType } from '@relhardware/dto-shared';

export class CreateItemDto implements IItem {
  @IsNotEmpty()
  itemType: IItemType;

  @IsOptional()
  @IsString()
  internalCode?: string;

  @IsString()
  model: string;

  @IsString()
  serviceTag: string;

  @IsOptional()
  @IsString()
  contract?: string;

  @IsOptional()
  @IsBoolean()
  dockingStation?: boolean;

  @IsOptional()
  @IsString()
  productNumber?: string;

  @IsOptional()
  @IsString()
  macAddress?: string;

  @IsOptional()
  @IsDate()
  creationDate?: Date;

  @IsOptional()
  @IsDate()
  modificationDate?: Date;

  @IsNotEmpty()
  company: ICompany;
}
