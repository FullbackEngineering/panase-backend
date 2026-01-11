// panase-nestjs-backend/src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { APP_GUARD } from '@nestjs/core'; // APP_GUARD'ı import edin
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // JwtAuthGuard'ı import edin

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule, // ConfigModule'u import edin
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' }, // Token süresi
      }),
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    {
      // 🚨 KONTROL EDİN: Bu provider tüm route'ları korur, bu yüzden @Public() gerekir
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // Global olarak JWT kimlik doğrulamasını uygular
    },
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
