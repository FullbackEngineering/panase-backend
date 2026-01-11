// panase-nestjs-backend/src/users/dto/create-user.dto.ts

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from '../../common/enums/user-role.enum'; // Doğru import

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string; // 🚨 Kesinlikle string olmalı

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole; // 🚨 role de burada tanımlı olmalı
}
