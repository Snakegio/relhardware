import { CreateRoleDto } from '../../roles/dto/create-role.dto';

export class UserResponseDto {
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
