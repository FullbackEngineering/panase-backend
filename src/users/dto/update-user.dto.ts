// src/users/dto/update-user.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, MinLength, IsEnum } from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum'; // UserRole enum'ını import et

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string; // Şifre isteğe bağlı olarak güncellenebilir

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEnum(UserRole) // Rolü enum ile doğrula
  role?: UserRole; // Rol de güncellenebilir
}
