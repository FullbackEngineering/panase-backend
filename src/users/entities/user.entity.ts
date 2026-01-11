// panase-nestjs-backend/src/users/entities/user.entity.ts

import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
// 🚨 BU YOLU KESİNLİKLE DOĞRULAYIN!
// Eğer common klasörü doğrudan src altında ise:
import { UserRole } from '../../common/enums/user-role.enum';
// Make sure that '../../common/enums/user-role.enum' exists and exports a TypeScript enum named UserRole, e.g.:
// export enum UserRole { ADMIN = 'admin', CLIENT = 'client', ... }
import { Appointment } from '../../appointments/entities/appointment.entity'; // 🚨 Appointment entity'sini import et
// Eğer enums klasörü doğrudan src altında ise:
// import { UserRole } from '../../enums/user-role.enum'; // Bu da olabilir

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  password?: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT })
  role: UserRole;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.doctor)
  doctorAppointments: Appointment[];
}
