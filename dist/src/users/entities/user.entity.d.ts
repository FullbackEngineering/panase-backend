import { BaseEntity } from 'typeorm';
import { UserRole } from '../../common/enums/user-role.enum';
import { Appointment } from '../../appointments/entities/appointment.entity';
export declare class User extends BaseEntity {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    password?: string;
    role: UserRole;
    phone?: string;
    address?: string;
    profilePicture?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    doctorAppointments: Appointment[];
}
