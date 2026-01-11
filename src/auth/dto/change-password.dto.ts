// src/auth/dto/change-password.dto.ts

import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Yeni şifre en az 6 karakter olmalıdır.' })
  newPassword: string;
}
