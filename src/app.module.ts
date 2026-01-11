// panase-nestjs-backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import ormConfig from '../ormconfig';

// 🚨 EKSİK OLAN IMPORTLAR BUNLAR OLABİLİR:
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { ClientsModule } from './clients/clients.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => ({ ...ormConfig }),
    }),

    // 🚨 BU MODÜLLERİ BURAYA EKLEMELİSİNİZ:
    AuthModule,
    UsersModule,
    CategoriesModule,
    AppointmentsModule,
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
