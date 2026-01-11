// panase-nestjs-backend/src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * @desc Kullanıcı giriş bilgilerini doğrular.
   */
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    // 1. Kullanıcı var mı kontrolü
    if (!user) {
      console.warn(
        `[AUTH] Giriş Başarısız: '${email}' veritabanında bulunamadı.`,
      );
      return null;
    }

    // 2. Şifre alanı gelmiş mi kontrolü (UsersService select hatası için)
    if (!user.password) {
      console.error(
        `[AUTH] KRİTİK HATA: Kullanıcı bulundu ama şifre okunamadı! UsersService.findByEmail metoduna 'select' eklemelisiniz.`,
      );
      return null;
    }

    // 3. Şifre karşılaştırma (Hash vs Plain Text)
    const isMatch = await bcrypt.compare(pass, user.password);

    if (isMatch) {
      console.log(`[AUTH] Giriş Başarılı: ${email}`);
      // Şifreyi objeden çıkarıp temiz kullanıcıyı döndür
      const { password, ...result } = user;
      void password; // ESLint 'unused var' hatasını engellemek için
      return result as User;
    }

    console.warn(`[AUTH] Giriş Başarısız: '${email}' için şifre hatalı.`);
    return null;
  }

  /**
   * @desc Başarılı giriş sonrası JWT Token üretir.
   */
  login(user: AuthenticatedUser | User) {
    const payload: IJwtPayload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      // 🚨 KRİTİK DÜZELTME: İsmi 'access_token' yaptık (Frontend ile uyum için)
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  /**
   * @desc Yeni kullanıcı kaydeder ve otomatik giriş yapar.
   */
  async register(createUserDto: CreateUserDto) {
    // Şifre hashleme işlemi UsersService.create içinde yapıldığı için
    // burada tekrar hashlemeye gerek yoktur (Eğer UsersService'de varsa).
    // Ancak emin olmak için UsersService koduna güveniyoruz.
    const newUser = await this.usersService.create(createUserDto);

    // Kayıt sonrası token dön
    return this.login(newUser);
  }
}
