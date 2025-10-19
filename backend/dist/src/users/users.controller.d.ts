import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getProfile(req: any): Promise<{
        promoRegistration: {
            promoCode: {
                id: string;
                createdAt: Date;
                code: string;
                description: string | null;
                isActive: boolean;
                createdBy: string;
                usedCount: number;
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProfile(req: any, updateData: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createManager(createManagerDto: {
        email: string;
        password: string;
        fullName: string;
        phone: string;
    }): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllManagers(): Promise<{
        _count: {
            promoCodes: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getAllWorkers(): Promise<{
        promoRegistration: {
            promoCode: {
                creator: {
                    email: string;
                    fullName: string;
                };
            } & {
                id: string;
                createdAt: Date;
                code: string;
                description: string | null;
                isActive: boolean;
                createdBy: string;
                usedCount: number;
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        };
        applications: {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        }[];
        _count: {
            applications: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getManagerWorkers(req: any): Promise<{
        promoRegistration: {
            promoCode: {
                id: string;
                createdAt: Date;
                code: string;
                description: string | null;
                isActive: boolean;
                createdBy: string;
                usedCount: number;
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        };
        applications: {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        }[];
        _count: {
            applications: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        bio: string | null;
        avatar: string | null;
        resetToken: string | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
