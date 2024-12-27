import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; // Nessun ruolo richiesto
    }

    const request = context.switchToHttp().getRequest();
    // console.log('RolesGuard: request ', request);
    const user = request.user;
    if (!user || !user.roles) {
      return false;
    }

    return roles.some((role) => user.roles.map((r) => r.name).includes(role));
  }
}
