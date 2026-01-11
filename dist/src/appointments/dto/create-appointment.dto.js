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
exports.CreateAppointmentDto = void 0;
const class_validator_1 = require("class-validator");
const appointment_entity_1 = require("../entities/appointment.entity");
class CreateAppointmentDto {
    guestName;
    guestEmail;
    guestPhone;
    guestMessage;
    dateTime;
    type;
    doctorId;
    categoryId;
    status;
}
exports.CreateAppointmentDto = CreateAppointmentDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(2, 100),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "guestName", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "guestEmail", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 20),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "guestPhone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "guestMessage", void 0);
__decorate([
    (0, class_validator_1.IsISO8601)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "dateTime", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(appointment_entity_1.AppointmentType),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "doctorId", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "categoryId", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(appointment_entity_1.AppointmentStatus),
    __metadata("design:type", String)
], CreateAppointmentDto.prototype, "status", void 0);
//# sourceMappingURL=create-appointment.dto.js.map