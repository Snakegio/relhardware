import { IRoleDto } from '../role/role.dto.interface';

export interface IUserDto {
  id: number;
  name: string;
  surname: string;
  creationDate: Date;
  modificationDate: Date;
  email: string;
  enable: boolean;
  enableInternet: boolean;
  password: string;
  pdfReport: number | null;
  roles: IRoleDto[];
}
