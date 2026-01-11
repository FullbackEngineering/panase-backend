import { Repository } from 'typeorm';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { User } from '../users/entities/user.entity';
import { Category } from '../categories/entities/category.entity';
import { Client } from '../clients/entities/client.entity';
export declare class AppointmentsService {
    private appointmentsRepository;
    private usersRepository;
    private categoriesRepository;
    private clientsRepository;
    constructor(appointmentsRepository: Repository<Appointment>, usersRepository: Repository<User>, categoriesRepository: Repository<Category>, clientsRepository: Repository<Client>);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(): Promise<Appointment[]>;
    findOne(id: string): Promise<Appointment>;
    update(id: string, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment>;
    remove(id: string): Promise<void>;
    findDoctorAppointments(doctorId: string): Promise<Appointment[]>;
    findClientAppointments(clientId: string): Promise<Appointment[]>;
}
