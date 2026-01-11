// src/categories/dto/create-category.dto.ts

import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Kategori adı metin olmalıdır.' })
  @IsNotEmpty({ message: 'Kategori adı boş bırakılamaz.' })
  @MaxLength(100, { message: 'Kategori adı en fazla 100 karakter olabilir.' })
  name: string;

  @IsString({ message: 'Açıklama metin olmalıdır.' })
  @MaxLength(500, { message: 'Açıklama en fazla 500 karakter olabilir.' })
  description?: string; // Opsiyonel
}
