// panase-nestjs-backend/src/auth/guards/jwt-auth.guard.ts

import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core'; // Reflector'ı import edin
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator'; // Public dekoratörünün anahtarını import edin

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // 🚨 KESİN DÜZELTME BURADA: Public dekoratörünü kontrol etme mantığı
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true; // Eğer public ise, guard'ı atla
    }
    try {
      return super.canActivate(context); // Değilse, JWT doğrulamasına devam et
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
