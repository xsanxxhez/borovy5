import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: string): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string;
        avatar: string;
        createdAt: Date;
    }>;
    updateProfile(userId: string, dto: UpdateProfileDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        bio: string;
        avatar: string;
    }>;
    deleteWorker(userId: string): Promise<{
        message: string;
        deletedWorker: {
            id: string;
            email: string;
            fullName: string;
        };
    }>;
    deleteManager(managerId: string): Promise<{
        message: string;
        deletedManager: {
            id: string;
            email: string;
            fullName: string;
        };
        deletedPromoCodes: number;
    }>;
    createManager(dto: CreateManagerDto): Promise<{
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
            _count: {
                registrations: number;
            };
            code: string;
            isActive: boolean;
            usedCount: number;
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
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
            job: {
                title: string;
                enterprise: {
                    name: string;
                };
            };
        }[];
        _count: {
            applications: number;
        };
    }[]>;
    getManagerWorkers(managerId: string): Promise<{
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
            status: import(".prisma/client").$Enums.ApplicationStatus;
            job: {
                title: string;
                enterprise: {
                    name: string;
                };
            };
        }[];
    }[]>;
}
