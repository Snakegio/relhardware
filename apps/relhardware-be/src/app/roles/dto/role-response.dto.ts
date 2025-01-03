import { IRoleDto, IUser } from '@relhardware/dto-shared';

export class RoleResponseDto implements IRoleDto {
  id: number;
  name: string;
  read: boolean;
  modify: boolean;
  read_pdf: boolean;
  read_history: boolean;
  users?: IUser[];
}
