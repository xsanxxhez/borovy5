import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getProfile(user: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string;
        avatar: string;
        createdAt: Date;
    }>;
    updateProfile(user: any, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string;
        avatar: string;
    }>;
    createManager(createManagerDto: CreateManagerDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getAllManagers(): Promise<{
        _count: {
            promoCodes: number;
            registrations: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string;
        createdAt: Date;
        promoCodes: {
            id: string;
            code: string;
            isActive: boolean;
            usedCount: number;
            _count: {
                registrations: number;
            };
        }[];
    }[]>;
    getAllWorkers(): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        createdAt: Date;
        promoRegistration: {
            promoCode: {
                code: string;
                creator: {
                    email: string;
                    fullName: string;
                };
            };
        };
        applications: {
            id: string;
            job: {
                enterprise: {
                    name: string;
                };
                title: string;
            };
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        }[];
        _count: {
            applications: number;
        };
    }[]>;
    deleteWorker(id: string): Promise<{
        message: string;
        deletedWorker: {
            id: string;
            email: string;
            fullName: string;
        };
    }>;
    deleteManager(id: string): Promise<{
        message: string;
        deletedManager: {
            id: string;
            email: string;
            fullName: string;
        };
        deletedPromoCodes: number;
    }>;
    getManagerWorkers(user: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        createdAt: Date;
        promoRegistration: {
            promoCode: {
                code: string;
            };
            registeredAt: Date;
        };
        applications: {
            id: string;
            job: {
                enterprise: {
                    name: string;
                };
                title: string;
            };
            status: import(".prisma/client").$Enums.ApplicationStatus;
        }[];
    }[]>;
}
