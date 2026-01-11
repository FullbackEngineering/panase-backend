// src/auth/strategies/jwt.strategy.ts

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common'; // 🚨 DÜZELTME: Kullanılmayan UnauthorizedException kaldırıldı
import { ConfigService } from '@nestjs/config';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET .env dosyasında bulunamadı!');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  /**
   * 🚨 DÜZELTME: ESLint '@typescript-eslint/require-await' uyarısı için:
   * Bu metod senkron bir veri döndürdüğü için 'async' kelimesini kaldırabiliriz.
   * Passport bu metodun sonucunu Promise olarak almayı da destekler.
   */
  validate(payload: IJwtPayload) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
      firstName: payload.firstName,
      lastName: payload.lastName,
    };
  }
}
