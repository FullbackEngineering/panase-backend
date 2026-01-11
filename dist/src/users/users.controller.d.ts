import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAllDoctors(): Promise<import("./entities/user.entity").User[]>;
    findAllClients(): Promise<import("./entities/user.entity").User[]>;
    createDoctor(createUserDto: CreateUserDto): Promise<import("./entities/user.entity").User>;
    remove(id: string): Promise<void>;
}
