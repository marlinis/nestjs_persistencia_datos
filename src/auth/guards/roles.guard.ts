import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../docorators/roles.decorator';
import { PayloadToken } from '../models/model.token';
import { Role } from '../models/roles.model';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());
    //Validando si no tiene roles para los enpoints que no tienen permisos en el controlador @Roles(Role.ADMIN)
    if (!roles) {
      return true;
    }
    //['admin', 'customer', 'super_admin' ];
    const request = context.switchToHttp().getRequest();
    const user = request.user as PayloadToken;
    //[role: 'admin', sub: identificador]
    const isAuth = roles.some((role) => role === user.role);
    if (!isAuth) {
      throw new UnauthorizedException('Your role is not defined');
    }
    return isAuth;
  }
}
