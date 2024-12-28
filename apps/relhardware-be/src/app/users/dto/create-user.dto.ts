import { IsBoolean, IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @Transform(({ value }) => value || new Date())
  creationDate: Date;

  @Transform(({ value }) => value || new Date())
  modificationDate: Date;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase())
  email: string;

  password: string;

  @IsBoolean()
  enable: boolean;

  @IsBoolean()
  enableInternet: boolean;
  pdfReport: number | null;
  roles: number[];
}
