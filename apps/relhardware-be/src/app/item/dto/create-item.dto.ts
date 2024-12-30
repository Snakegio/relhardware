import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateItemDto {
  @IsNotEmpty()
  @IsNumber()
  itemType: number;

  @IsOptional()
  @IsString()
  internalCode?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  serviceTag?: string;

  @IsOptional()
  @IsString()
  company?: string;

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
  @IsNumber()
  @Transform(({ obj }) => obj.id || null)
  idCompany: number;
}
