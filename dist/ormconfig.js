"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./src/users/entities/user.entity");
const category_entity_1 = require("./src/categories/entities/category.entity");
const appointment_entity_1 = require("./src/appointments/entities/appointment.entity");
const client_entity_1 = require("./src/clients/entities/client.entity");
const config = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Eren9696',
    database: process.env.DB_DATABASE || 'testpanasedb',
    entities: [user_entity_1.User, category_entity_1.Category, appointment_entity_1.Appointment, client_entity_1.Client],
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map