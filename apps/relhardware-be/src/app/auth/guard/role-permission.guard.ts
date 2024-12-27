import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolePermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const readPermission = this.reflector.get<boolean>(
      'readPermission',
      context.getHandler()
    );
    if (!readPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // console.log('RolesGuard: request ', request);
    const user = request.user;
    if (!user || !user.roles) {
      return false;
    }
    return user.roles.some((role) => role.read === true);
  }
}
