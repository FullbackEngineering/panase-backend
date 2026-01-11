import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserRole } from '../common/enums/user-role.enum';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    }>;
    login(req: {
        user: AuthenticatedUser;
    }): {
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: UserRole;
        };
    };
    getProfile(req: {
        user: AuthenticatedUser;
    }): AuthenticatedUser;
    getAdminDashboard(req: {
        user: AuthenticatedUser;
    }): string;
}
