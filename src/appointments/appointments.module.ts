// src/appointments/appointments.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { Appointment } from './entities/appointment.entity';
import { User } from '../users/entities/user.entity'; // 👈 User entity'sini import et
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/client.entity';

@Module({
  imports: [
    // 👈 DÜZELTME: User entity'sini TypeOrmModule.forFeature'a ekledik
    TypeOrmModule.forFeature([Appointment, User, Category, Client]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
