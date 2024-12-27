import { SetMetadata } from '@nestjs/common';

export interface RolePermission {
  read: boolean;
  modify: boolean;
  readPdf: boolean;
  readHistory: boolean;
}

export const Roles = (rolePermission: RolePermission) =>
  SetMetadata('rolePermission', rolePermission);
