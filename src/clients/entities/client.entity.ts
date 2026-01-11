// src/clients/entities/client.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity'; // 👈 Appointment'ı import ediyoruz

@Entity('clients')
export class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  dateOfBirth: Date; // Örnek olarak doğum tarihi alanı

  @Column({ type: 'text', nullable: true })
  notes: string; // Hastaya özel notlar

  // --- İLİŞKİLER ---

  // Bu hastaya ait randevular
  @OneToMany(() => Appointment, (appointment) => appointment.client)
  appointments: Appointment[]; // 👈 Bu satır eklendi / güncellendi

  // --- Zaman Damgaları ---
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
