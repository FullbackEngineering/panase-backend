import { UserRole } from '../../common/enums/user-role.enum';
export interface IJwtPayload {
    email: string;
    sub: string;
    role: UserRole;
    firstName: string;
    lastName: string;
}
