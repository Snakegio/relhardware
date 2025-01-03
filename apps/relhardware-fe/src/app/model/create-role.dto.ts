export interface CreateRoleDto {
  name: string;
  read: boolean;
  modify: boolean;
  readPdf: boolean;
  readHistory: boolean;
}
