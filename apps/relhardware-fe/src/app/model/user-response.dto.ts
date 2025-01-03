import { CreateRoleDto } from './create-role.dto';

export interface UserResponseDto {
  id: number;
  name: string;
  surname: string;
  creationDate: Date;
  modificationDate: Date;
  email: string;
  enable: boolean;
  enableInternet: boolean;
  pdfReport: number | null;
  roles: CreateRoleDto[];
}
