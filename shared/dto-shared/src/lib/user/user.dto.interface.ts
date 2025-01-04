import { IRoleDto } from '../role/role.dto.interface';

export interface IUser {
  id?: number;
  name?: string;
  surname?: string;
  creationDate?: Date;
  modificationDate?: Date;
  email: string;
  enable: boolean;
  password?: string;
  roles?: IRoleDto[];
}
