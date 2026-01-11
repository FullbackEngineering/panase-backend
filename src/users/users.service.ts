// src/users/users.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findAllDoctors(): Promise<User[]> {
    return this.usersRepository.find({
      where: { role: UserRole.DOCTOR },
      select: ['id', 'firstName', 'lastName', 'email'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['appointments'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return user;
  }

  // 🚨 GÜNCELLENDİ/EKLENDİ: findByEmail metodu, şifreyi de çekebiliyor
  // Bu metot, AuthGuard'lar tarafından kullanılacak.
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      // 🚨 BU SATIR EKSİKSE GİRİŞ YAPAMAZSINIZ:
      select: ['id', 'email', 'password', 'role', 'firstName', 'lastName'],
    });
  }

  // 🚨 GÜNCELLENDİ: update metodu, şifre güncellemeyi daha genel bir şekilde ele alıyor
  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id); // Kategori yoksa 404 fırlatır

    // Eğer updateDto'da password varsa, şifreyi hashleyerek güncelle
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  // 🚨 YENİ EKLENDİ: Sadece şifre güncellemek için özel bir metot (isteğe bağlı, ama hatayı çözmek için)
  async updatePassword(id: string, newPasswordPlain: string): Promise<User> {
    const user = await this.findOne(id);
    user.password = await bcrypt.hash(newPasswordPlain, 10);
    return this.usersRepository.save(user);
  }

  async findAllByRole(role: UserRole): Promise<User[]> {
    return this.usersRepository.find({
      where: { role },
      // select kısmında role'ü de eklediğinden emin ol, Guard'lar bunu kontrol eder
      select: ['id', 'email', 'firstName', 'lastName', 'role', 'createdAt'],
      order: { createdAt: 'DESC' },
    });
  }
  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
