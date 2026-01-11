// panase-nestjs-backend/src/auth/interfaces/jwt-payload.interface.ts

import { UserRole } from '../../common/enums/user-role.enum';

export interface IJwtPayload {
  email: string;
  sub: string; // Kullanıcı ID'si
  role: UserRole;
  firstName: string; // 🚨 Bu satırı eklemiş olmalısınız
  lastName: string; // 🚨 Bu satırı eklemiş olmalısınız
}
