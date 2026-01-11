import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<User | null>;
    login(user: AuthenticatedUser | User): {
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../common/enums/user-role.enum").UserRole;
        };
    };
    register(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: import("../common/enums/user-role.enum").UserRole;
        };
    }>;
}
