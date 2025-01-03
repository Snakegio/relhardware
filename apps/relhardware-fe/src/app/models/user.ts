import { IUser } from '@relhardware/dto-shared';
import { JwtPayload } from 'jwt-decode';

export interface User extends IUser, JwtPayload {}
