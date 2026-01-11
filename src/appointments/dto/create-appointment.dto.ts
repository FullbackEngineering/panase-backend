// src/appointments/dto/create-appointment.dto.ts

import {
  IsString,
  IsEmail,
  IsOptional,
  IsUUID,
  IsEnum,
  IsISO8601,
  Length,
} from 'class-validator';
import {
  AppointmentStatus,
  AppointmentType,
} from '../entities/appointment.entity';

export class CreateAppointmentDto {
  // --- MİSAFİR BİLGİLERİ (Zorunlu) ---
  @IsString()
  @Length(2, 100)
  guestName: string;

  @IsEmail()
  guestEmail: string;

  @IsOptional()
  @IsString()
  @Length(10, 20) // Telefon numarası uzunluğunu ayarlayabilirsiniz
  guestPhone?: string;

  @IsOptional()
  @IsString()
  guestMessage?: string; // Daha önce 'notes' idi, şimdi 'guestMessage' olarak daha açık

  // --- RANDEVU DETAYLARI (Zorunlu) ---
  @IsISO8601() // ISO 8601 formatında tarih/saat string'i bekliyoruz
  dateTime: string;

  @IsEnum(AppointmentType)
  type: AppointmentType; // Online veya Yüz Yüze

  // --- İLİŞKİLER (Zorunlu) ---
  @IsUUID()
  doctorId: string; // Randevunun alınacağı doktorun ID'si

  @IsUUID()
  categoryId: string; // Randevunun kategorisinin ID'si

  // --- Durum (Opsiyonel, varsayılan değer backend'de ayarlanır) ---
  @IsOptional()
  @IsEnum(AppointmentStatus)
  status?: AppointmentStatus; // Varsayılanı 'pending' olacak
}
