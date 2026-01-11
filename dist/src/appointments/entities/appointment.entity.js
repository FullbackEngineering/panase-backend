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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = exports.AppointmentStatus = exports.AppointmentType = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../users/entities/user.entity");
const category_entity_1 = require("../../categories/entities/category.entity");
const client_entity_1 = require("../../clients/entities/client.entity");
var AppointmentType;
(function (AppointmentType) {
    AppointmentType["ONLINE"] = "Online";
    AppointmentType["IN_PERSON"] = "Y\u00FCz Y\u00FCze";
})(AppointmentType || (exports.AppointmentType = AppointmentType = {}));
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["PENDING"] = "pending";
    AppointmentStatus["CONFIRMED"] = "confirmed";
    AppointmentStatus["CANCELLED"] = "cancelled";
    AppointmentStatus["COMPLETED"] = "completed";
})(AppointmentStatus || (exports.AppointmentStatus = AppointmentStatus = {}));
let Appointment = class Appointment {
    id;
    guestName;
    guestEmail;
    guestPhone;
    guestMessage;
    dateTime;
    type;
    status;
    doctor;
    doctorId;
    category;
    categoryId;
    client;
    clientId;
    createdAt;
    updatedAt;
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'Randevuyu alan misafirin adı' }),
    __metadata("design:type", String)
], Appointment.prototype, "guestName", void 0);
__decorate([
    (0, typeorm_1.Column)({ comment: 'Misafirin e-postası' }),
    __metadata("design:type", String)
], Appointment.prototype, "guestEmail", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'Misafirin telefonu' }),
    __metadata("design:type", String)
], Appointment.prototype, "guestPhone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true, comment: 'Misafirin notu' }),
    __metadata("design:type", String)
], Appointment.prototype, "guestMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp with time zone',
        comment: 'Randevu tarihi ve saati',
    }),
    __metadata("design:type", Date)
], Appointment.prototype, "dateTime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AppointmentType,
        default: AppointmentType.ONLINE,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: AppointmentStatus,
        default: AppointmentStatus.PENDING,
    }),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.doctorAppointments, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'doctorId' }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "doctor", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: "Atanan doktorun ID'si" }),
    __metadata("design:type", String)
], Appointment.prototype, "doctorId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.Category, (category) => category.appointments, {
        onDelete: 'SET NULL',
        nullable: true,
    }),
    (0, typeorm_1.JoinColumn)({ name: 'categoryId' }),
    __metadata("design:type", category_entity_1.Category)
], Appointment.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: "Randevu kategorisinin ID'si" }),
    __metadata("design:type", String)
], Appointment.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => client_entity_1.Client, (client) => client.appointments, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'clientId' }),
    __metadata("design:type", Object)
], Appointment.prototype, "client", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: "Eşleştirilen hasta profilinin ID'si" }),
    __metadata("design:type", Object)
], Appointment.prototype, "clientId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('appointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map