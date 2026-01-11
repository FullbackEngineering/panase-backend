// src/auth/strategies/local.strategy.ts

import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // 🚨 Postman'den 'email' adıyla gönderdiğimiz için eşliyoruz
    super({ usernameField: 'email' });
  }

  async validate(email: string, pass: string): Promise<any> {
    const user = await this.authService.validateUser(email, pass);
    if (!user) {
      // 🚨 null döndüğünde Passport bu hatayı fırlatır
      throw new UnauthorizedException('Geçersiz e-posta veya şifre');
    }
    return user;
  }
}
