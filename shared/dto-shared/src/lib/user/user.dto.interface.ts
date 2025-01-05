export interface IUser {
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
