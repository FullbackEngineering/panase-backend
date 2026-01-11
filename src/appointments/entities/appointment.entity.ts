// src/appointments/entities/appointment.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Client } from '../../clients/entities/client.entity';

export enum AppointmentType {
  ONLINE = 'Online',
  IN_PERSON = 'Yüz Yüze',
}

export enum AppointmentStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

@Entity('appointments')
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ comment: 'Randevuyu alan misafirin adı' })
  guestName: string;

  @Column({ comment: 'Misafirin e-postası' })
  guestEmail: string;

  @Column({ nullable: true, comment: 'Misafirin telefonu' })
  guestPhone: string;

  @Column({ type: 'text', nullable: true, comment: 'Misafirin notu' })
  guestMessage: string;

  @Column({
    type: 'timestamp with time zone',
    comment: 'Randevu tarihi ve saati',
  })
  dateTime: Date;

  @Column({
    type: 'enum',
    enum: AppointmentType,
    default: AppointmentType.ONLINE,
  })
  type: AppointmentType;

  @Column({
    type: 'enum',
    enum: AppointmentStatus,
    default: AppointmentStatus.PENDING,
  })
  status: AppointmentStatus;

  @ManyToOne(() => User, (user) => user.doctorAppointments, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'doctorId' })
  doctor: User;

  @Column({ nullable: true, comment: "Atanan doktorun ID'si" })
  doctorId: string;

  @ManyToOne(() => Category, (category) => category.appointments, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column({ nullable: true, comment: "Randevu kategorisinin ID'si" })
  categoryId: string;

  // --- HASTA EŞLEŞTİRMESİ ---
  // 👈 DÜZELTME: client ve clientId özelliklerinin tipine ' | null' eklendi
  @ManyToOne(() => Client, (client) => client.appointments, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'clientId' })
  client: Client | null; // 👈 Buraya '| null' eklendi

  @Column({ nullable: true, comment: "Eşleştirilen hasta profilinin ID'si" })
  clientId: string | null; // 👈 Buraya '| null' eklendi

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
