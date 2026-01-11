// src/auth/dto/login-user.dto.ts
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'E-posta boş bırakılamaz.' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi girin.' })
  email: string;

  @IsNotEmpty({ message: 'Şifre boş bırakılamaz.' })
  @IsString()
  password: string;
}
