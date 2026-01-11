// src/auth/decorators/roles.decorator.ts

import { SetMetadata } from '@nestjs/common';
// 🚨 DÜZELTME: Import yolu güncellendi
import { UserRole } from '../../common/enums/user-role.enum';

export const ROLES_KEY = 'roles';
export const HasRoles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);
