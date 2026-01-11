import { Appointment } from '../../appointments/entities/appointment.entity';
export declare class Client {
    id: string;
    name: string;
    email: string;
    phone: string;
    dateOfBirth: Date;
    notes: string;
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
