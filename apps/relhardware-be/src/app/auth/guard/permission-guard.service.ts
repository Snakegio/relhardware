import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Ottieni i permessi dal contesto
    const readPermission = this.reflector.get<boolean>(
      'readPermission',
      context.getHandler()
    );
    const modifyPermission = this.reflector.get<boolean>(
      'modifyPermission',
      context.getHandler()
    );

    // Se nessuno dei due permessi è richiesto, permette l'accesso
    if (!readPermission && !modifyPermission) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Se l'utente o i suoi ruoli non esistono, nega l'accesso
    if (!user || !user.roles) {
      return false;
    }

    // Controlla se l'utente ha i permessi necessari
    const hasReadPermission = readPermission
      ? user.roles.some((role) => role.read === true)
      : false;

    const hasModifyPermission = modifyPermission
      ? user.roles.some((role) => role.modify === true)
      : false;

    // Permetti l'accesso se uno dei due permessi è soddisfatto
    return hasReadPermission || hasModifyPermission;
  }
}
