import { UserRole } from '../../common/enums/user-role.enum';
export interface AuthenticatedUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}
