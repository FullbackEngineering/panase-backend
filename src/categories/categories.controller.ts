// src/categories/categories.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { HasRoles } from '../common/decorators/roles.decorator'; // Yolu kontrol et: ../auth/decorators/roles.decorator mı?
import { UserRole } from '../common/enums/user-role.enum';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Public } from '../common/decorators/public.decorator'; // 👈 Bu import KESİNLİKLE olmalı

@UseGuards(JwtAuthGuard, RolesGuard) // Controller seviyesindeki koruma
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @HasRoles(UserRole.ADMIN)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Public() // 🚨 BU KESİNLİKLE OLMALI! Bu metot anonim olarak erişilebilir olmalı.
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public() // 🚨 Eğer tekil bir kategoriye de anonim erişim gerekiyorsa, buraya da ekleyin
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @HasRoles(UserRole.ADMIN)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @HasRoles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }
}
