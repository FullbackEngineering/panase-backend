// panase-nestjs-backend/src/appointments/appointments.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'; // JwtAuthGuard'ı import edin
import { Public } from '../common/decorators/public.decorator'; // Public dekoratörünü import edin

// Eğer bu controller'ın tüm metotları varsayılan olarak korunuyorsa:
// @UseGuards(JwtAuthGuard) // Eğer bu satır varsa, tüm metotlar korunur. Public olanlar hariç.
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // 🚨 KESİN DÜZELTME BURADA: Randevu oluşturma metodu herkese açık olmalı
  @Public() // BU ÇOK ÖNEMLİ! Bu endpoint için JWT token'ı gerekmez.
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  // Eğer Get metotları da herkes tarafından erişilebilir olacaksa onları da @Public() yapın
  // @Public()
  @Get()
  findAll() {
    return this.appointmentsService.findAll();
  }

  // @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(id);
  }

  // Bu metotlar büyük ihtimalle korunmalı kalmalı
  @UseGuards(JwtAuthGuard) // Sadece bu metotları korumak için UseGuards eklenebilir
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard) // Sadece bu metotları korumak için UseGuards eklenebilir
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(id);
  }
}
