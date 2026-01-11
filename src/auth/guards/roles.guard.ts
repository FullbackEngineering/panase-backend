// src/auth/guards/roles.guard.ts

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../common/enums/user-role.enum';
import { AuthenticatedUser } from '../interfaces/authenticated-user.interface';
import { ROLES_KEY } from '../../common/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Controller'da @HasRoles ile hangi rollerin istendiğini al
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    // Eğer rota için @HasRoles tanımlanmamışsa, herkes girebilir (public)
    if (!requiredRoles) {
      return true;
    }

    // 2. JwtAuthGuard tarafından doğrulanmış kullanıcının bilgilerini al
    const req = context
      .switchToHttp()
      .getRequest<{ user?: AuthenticatedUser }>();

    const user = req.user;

    if (!user) {
      return false; // JwtAuthGuard zaten bunu engeller, ama ekstra güvenlik
    }

    // 3. Kullanıcının rolü, istenen rollerden biriyle eşleşiyor mu?
    return requiredRoles.some((role) => user.role === role);
  }
}
