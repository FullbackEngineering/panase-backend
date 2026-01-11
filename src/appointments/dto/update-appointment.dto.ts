// src/appointments/dto/update-appointment.dto.ts

import { PartialType } from '@nestjs/mapped-types';
import { CreateAppointmentDto } from './create-appointment.dto';
import { IsOptional, IsUUID } from 'class-validator';

// PartialType, CreateAppointmentDto'daki tüm alanları opsiyonel yapar
export class UpdateAppointmentDto extends PartialType(CreateAppointmentDto) {
  // Randevu güncellenirken ek olarak clientId atanabilir (Doktor/Admin paneli için)
  // Bu, misafir randevusunu mevcut bir hastaya bağlamak için kullanılır.
  // Misafir randevu alırken bu alanı göndermeyecek.
  @IsOptional()
  @IsUUID()
  clientId?: string;
}
