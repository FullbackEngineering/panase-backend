import { Appointment } from '../../appointments/entities/appointment.entity';
export declare class Category {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    appointments: Appointment[];
}
