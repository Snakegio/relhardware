import { IUser } from '@relhardware/dto-shared';

export class UserResponseDto implements IUser {
  id?: string;
  createdTimestamp?: number;
  username?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  email?: string;
  firstName?: string;
  groups?: string[];
  lastName?: string;
  realmRoles?: string[];
}
