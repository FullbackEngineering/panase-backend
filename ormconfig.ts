// panase-backend/ormconfig.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './src/users/entities/user.entity'; // User entity'sini import edin
import { Category } from './src/categories/entities/category.entity'; // Category entity'sini import edin
import { Appointment } from './src/appointments/entities/appointment.entity'; // Appointment entity'sini import edin
import { Client } from './src/clients/entities/client.entity'; // 🚨 DÜZELTME: Client entity'sini import edin

const config: TypeOrmModuleOptions = {
  type: 'postgres', // Veritabanı türü
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres', // Kendi kullanıcı adınızı ayarlayın
  password: process.env.DB_PASSWORD || 'Eren9696', // Kendi şifrenizi ayarlayın
  database: process.env.DB_DATABASE || 'testpanasedb', // Kendi veritabanı adınızı ayarlayın
  // 🚨 DÜZELTME: Client Entity'sini entities dizisine ekleyin!
  entities: [User, Category, Appointment, Client], // Entity'lerinizin yolu
  synchronize: process.env.NODE_ENV === 'development', // Geliştirme ortamında true, üretimde false olmalı
  logging: process.env.NODE_ENV === 'development', // Geliştirme ortamında true
};

export default config;
