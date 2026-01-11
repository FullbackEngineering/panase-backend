import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';
import { Client } from '../../clients/entities/client.entity';
export declare enum AppointmentType {
    ONLINE = "Online",
    IN_PERSON = "Y\u00FCz Y\u00FCze"
}
export declare enum AppointmentStatus {
    PENDING = "pending",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare class Appointment {
    id: string;
    guestName: string;
    guestEmail: string;
    guestPhone: string;
    guestMessage: string;
    dateTime: Date;
    type: AppointmentType;
    status: AppointmentStatus;
    doctor: User;
    doctorId: string;
    category: Category;
    categoryId: string;
    client: Client | null;
    clientId: string | null;
    createdAt: Date;
    updatedAt: Date;
}
