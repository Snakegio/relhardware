import { IRoleDto, IUserDto } from '@relhardware/dto-shared';
import { Exclude } from 'class-transformer';

export class UserResponseDto implements IUserDto {
  id: number;
  name: string;
  surname: string;
  creationDate: Date;
  modificationDate: Date;
  email: string;
  enable: boolean;
  enableInternet: boolean;
  @Exclude()
  password: string;
  pdfReport: number | null;
  roles: IRoleDto[];
}
