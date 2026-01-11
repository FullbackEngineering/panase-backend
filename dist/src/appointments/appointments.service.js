"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const user_entity_1 = require("../users/entities/user.entity");
const category_entity_1 = require("../categories/entities/category.entity");
const client_entity_1 = require("../clients/entities/client.entity");
let AppointmentsService = class AppointmentsService {
    appointmentsRepository;
    usersRepository;
    categoriesRepository;
    clientsRepository;
    constructor(appointmentsRepository, usersRepository, categoriesRepository, clientsRepository) {
        this.appointmentsRepository = appointmentsRepository;
        this.usersRepository = usersRepository;
        this.categoriesRepository = categoriesRepository;
        this.clientsRepository = clientsRepository;
    }
    async create(createAppointmentDto) {
        const { doctorId, categoryId, guestEmail, ...guestData } = createAppointmentDto;
        const doctor = await this.usersRepository.findOne({
            where: { id: doctorId },
        });
        if (!doctor) {
            throw new common_1.NotFoundException(`Doctor with ID "${doctorId}" not found.`);
        }
        const category = await this.categoriesRepository.findOne({
            where: { id: categoryId },
        });
        if (!category) {
            throw new common_1.NotFoundException(`Category with ID "${categoryId}" not found.`);
        }
        const newAppointment = this.appointmentsRepository.create({
            ...guestData,
            guestEmail,
            doctor,
            category,
            status: appointment_entity_1.AppointmentStatus.PENDING,
        });
        return this.appointmentsRepository.save(newAppointment);
    }
    async findAll() {
        return this.appointmentsRepository.find({
            relations: ['doctor', 'category', 'client'],
        });
    }
    async findOne(id) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ['doctor', 'category', 'client'],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID "${id}" not found.`);
        }
        return appointment;
    }
    async update(id, updateAppointmentDto) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ['doctor', 'category', 'client'],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID "${id}" not found.`);
        }
        Object.assign(appointment, updateAppointmentDto);
        if (updateAppointmentDto.doctorId) {
            const doctor = await this.usersRepository.findOne({
                where: { id: updateAppointmentDto.doctorId },
            });
            if (!doctor) {
                throw new common_1.NotFoundException(`Doctor with ID "${updateAppointmentDto.doctorId}" not found.`);
            }
            appointment.doctor = doctor;
        }
        if (updateAppointmentDto.categoryId) {
            const category = await this.categoriesRepository.findOne({
                where: { id: updateAppointmentDto.categoryId },
            });
            if (!category) {
                throw new common_1.NotFoundException(`Category with ID "${updateAppointmentDto.categoryId}" not found.`);
            }
            appointment.category = category;
        }
        if (updateAppointmentDto.clientId !== undefined) {
            if (updateAppointmentDto.clientId === null) {
                appointment.client = null;
                appointment.clientId = null;
            }
            else {
                const client = await this.clientsRepository.findOne({
                    where: { id: updateAppointmentDto.clientId },
                });
                if (!client) {
                    throw new common_1.NotFoundException(`Client with ID "${updateAppointmentDto.clientId}" not found.`);
                }
                appointment.client = client;
                appointment.clientId = client.id;
            }
        }
        return this.appointmentsRepository.save(appointment);
    }
    async remove(id) {
        const result = await this.appointmentsRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Appointment with ID "${id}" not found.`);
        }
    }
    async findDoctorAppointments(doctorId) {
        return this.appointmentsRepository.find({
            where: { doctor: { id: doctorId } },
            relations: ['category', 'client'],
        });
    }
    async findClientAppointments(clientId) {
        return this.appointmentsRepository.find({
            where: { client: { id: clientId } },
            relations: ['doctor', 'category'],
        });
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(3, (0, typeorm_1.InjectRepository)(client_entity_1.Client)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map