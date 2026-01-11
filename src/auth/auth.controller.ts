// src/auth/auth.controller.ts

import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Public } from '../common/decorators/public.decorator';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { HasRoles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum'; // UserRole'ü import ediyoruz
// import { LoginUserDto } from './dto/login-user.dto'; // <-- LoginUserDto import'unu kaldırdık, çünkü doğrudan kullanılmıyor
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { RolesGuard } from './guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // `async` kelimesini kaldırıyoruz çünkü içinde `await` yok.
  // `LoginUserDto` parametresini kaldırıyoruz çünkü `LocalAuthGuard` onu işliyor.
  // `req.user`'a doğru tipi veriyoruz.
  login(@Request() req: { user: AuthenticatedUser }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: AuthenticatedUser }) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Get('admin-dashboard')
  getAdminDashboard(@Request() req: { user: AuthenticatedUser }) {
    return `Welcome to the Admin Dashboard, ${req.user.firstName}! Your role is ${req.user.role}.`;
  }
}
