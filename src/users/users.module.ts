// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm'; // 👈 Import et
import { User } from './entities/user.entity'; // 👈 Import et

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // 👈 User Entity'yi bu modüle bağla
  ],
  controllers: [UsersController],
  providers: [UsersService],
  // 👈 DİKKAT: AuthService'in UsersService'i kullanabilmesi için dışarı aktar
  exports: [UsersService],
})
export class UsersModule {}
