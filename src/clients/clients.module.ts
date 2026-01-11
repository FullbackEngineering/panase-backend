// src/clients/clients.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 TypeOrmModule import edildi
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { Client } from './entities/client.entity'; // 👈 Client entity import edildi

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]), // 👈 DÜZELTME: Client entity'sinin deposu sağlanıyor
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
  exports: [ClientsService], // 👈 İleride başka modüller ClientService'i kullanabilir
})
export class ClientsModule {}
