import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsBoolean()
  read: boolean;
  @IsBoolean()
  modify: boolean;
  @IsBoolean()
  readPdf: boolean;
  @IsBoolean()
  readHistory: boolean;
}
