import { IUser } from '../user/user.dto.interface';

export interface IRoleDto {
  id: number;
  name: string;
  read: boolean;
  modify: boolean;
  read_pdf: boolean;
  read_history: boolean;
  users?: IUser[];
}
