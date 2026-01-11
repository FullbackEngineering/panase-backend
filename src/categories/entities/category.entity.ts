// src/categories/entities/category.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// Eğer bir kategori birden fazla randevu türüyle ilişkiliyse, veya başka bir entity ile
// buraya o ilişkinin OneToMany/ManyToOne tarafı gelebilir.
// Şimdilik sadece Category entity'sini tanımlıyoruz.
import { Appointment } from '../../appointments/entities/appointment.entity'; // 🚨 DÜZELTME: Appointment entity'sini import ediyoruz

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string; // Örneğin: "Kardiyoloji", "Dermatoloji", "Pediatri"

  @Column({ nullable: true })
  description: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.category)
  appointments: Appointment[];

  // İleride, eğer bir kategori birden fazla "Service" veya "AppointmentType" ile ilişkili olacaksa,
  // bu ilişkiler buraya eklenebilir. Örneğin:
  // @OneToMany
}
