// src/auth/dto/register-user.dto.ts
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'E-posta alanı boş bırakılamaz.' })
  @IsEmail({}, { message: 'Geçerli bir e-posta adresi girin.' })
  email: string;

  @IsNotEmpty({ message: 'Şifre alanı boş bırakılamaz.' })
  @IsString()
  @MinLength(6, { message: 'Şifre minimum 6 karakter olmalıdır.' })
  password: string;

  @IsNotEmpty({ message: 'İsim alanı boş bırakılamaz.' })
  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
