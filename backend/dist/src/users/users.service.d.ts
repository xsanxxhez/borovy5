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
    createManager(dto: CreateManagerDto): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    getAllManagers(): Promise<{
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
