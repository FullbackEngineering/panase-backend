import { AppointmentStatus, AppointmentType } from '../entities/appointment.entity';
export declare class CreateAppointmentDto {
    guestName: string;
    guestEmail: string;
    guestPhone?: string;
    guestMessage?: string;
    dateTime: string;
    type: AppointmentType;
    doctorId: string;
    categoryId: string;
    status?: AppointmentStatus;
}
