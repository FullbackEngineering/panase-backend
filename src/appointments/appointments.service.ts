// src/appointments/appointments.service.ts

import { Injectable, NotFoundException } from '@nestjs/common'; // 👈 DÜZELTME: BadRequestException ve UnauthorizedException kaldırıldı
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, AppointmentStatus } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { doctorId, categoryId, guestEmail, ...guestData } =
      createAppointmentDto;

    const doctor = await this.usersRepository.findOne({
      where: { id: doctorId },
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID "${doctorId}" not found.`);
    }

    const category = await this.categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException(
        `Category with ID "${categoryId}" not found.`,
      );
    }

    const newAppointment = this.appointmentsRepository.create({
      ...guestData,
      guestEmail,
      doctor,
      category,
      status: AppointmentStatus.PENDING,
      // clientId başlangıçta boş kalacak, doktor sonradan eşleştirecek
    });

    return this.appointmentsRepository.save(newAppointment);
  }

  async findAll(): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      relations: ['doctor', 'category', 'client'],
    });
  }

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor', 'category', 'client'],
    });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found.`);
    }
    return appointment;
  }

  async update(
    id: string,
    updateAppointmentDto: UpdateAppointmentDto,
  ): Promise<Appointment> {
    // Önce mevcut randevuyu bulalım ki TypeORM ilişkili objeleri de doğru yönetebilsin
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ['doctor', 'category', 'client'], // Mevcut ilişkileri de yükle
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID "${id}" not found.`);
    }

    // DTO'daki basit alanları doğrudan atayalım (guestName, guestEmail vb.)
    Object.assign(appointment, updateAppointmentDto);

    // Eğer doctorId güncelleniyorsa
    if (updateAppointmentDto.doctorId) {
      const doctor = await this.usersRepository.findOne({
        where: { id: updateAppointmentDto.doctorId },
      });
      if (!doctor) {
        throw new NotFoundException(
          `Doctor with ID "${updateAppointmentDto.doctorId}" not found.`,
        );
      }
      appointment.doctor = doctor;
    }

    // Eğer categoryId güncelleniyorsa
    if (updateAppointmentDto.categoryId) {
      const category = await this.categoriesRepository.findOne({
        where: { id: updateAppointmentDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException(
          `Category with ID "${updateAppointmentDto.categoryId}" not found.`,
        );
      }
      appointment.category = category;
    }

    // Eğer clientId güncelleniyorsa (Doktor/Admin randevuyu bir hastaya atıyor)
    // clientId: null gönderilirse ilişkiyi kesmeliyiz.
    if (updateAppointmentDto.clientId !== undefined) {
      // undefined olması alanı güncellemediğimiz anlamına gelir
      if (updateAppointmentDto.clientId === null) {
        appointment.client = null; // İlişkiyi kes
        appointment.clientId = null; // ID'yi de sıfırla
      } else {
        const client = await this.clientsRepository.findOne({
          where: { id: updateAppointmentDto.clientId },
        });
        if (!client) {
          throw new NotFoundException(
            `Client with ID "${updateAppointmentDto.clientId}" not found.`,
          );
        }
        appointment.client = client;
        appointment.clientId = client.id; // ID'yi de güncelle
      }
    }
    // 👈 DÜZELTME: updateAppointmentDto.clientId === null kısmını yukarı taşıdık

    return this.appointmentsRepository.save(appointment);
  }

  async remove(id: string): Promise<void> {
    const result = await this.appointmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID "${id}" not found.`);
    }
  }

  async findDoctorAppointments(doctorId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { doctor: { id: doctorId } },
      relations: ['category', 'client'],
    });
  }

  async findClientAppointments(clientId: string): Promise<Appointment[]> {
    return this.appointmentsRepository.find({
      where: { client: { id: clientId } },
      relations: ['doctor', 'category'],
    });
  }
}
