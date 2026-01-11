// src/categories/dto/update-category.dto.ts

import { PartialType } from '@nestjs/mapped-types'; // Veya '@nestjs/swagger'
import { CreateCategoryDto } from './create-category.dto';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  // UpdateCategoryDto, CreateCategoryDto'nun tüm alanlarını opsiyonel hale getirir.
}
