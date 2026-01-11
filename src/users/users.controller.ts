import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../common/decorators/roles.decorator';
import { UserRole } from './../common/enums/user-role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * 1. Tüm Doktorları Listele (Admin Yetkisiyle)
   * UI: Doktor Yönetimi ekranındaki tabloyu besler.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Get('doctors')
  findAllDoctors() {
    return this.usersService.findAllByRole(UserRole.DOCTOR);
  }

  /**
   * 2. Tüm Danışanları (Hastaları) Listele (Admin Yetkisiyle)
   * UI: Kayıtlı Hasta istatistik kartını ve hasta listesini besler.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Get('clients')
  findAllClients() {
    return this.usersService.findAllByRole(UserRole.CLIENT);
  }

  /**
   * 3. Admin Panelinden Yeni Doktor Kaydı
   * Rolü sistem tarafından otomatik olarak 'doctor' olarak atanır.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Post('create-doctor')
  createDoctor(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create({
      ...createUserDto,
      role: UserRole.DOCTOR,
    });
  }

  /**
   * 4. Kullanıcı Silme
   * Hem doktorları hem hastaları yönetmek için kullanılır.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HasRoles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
