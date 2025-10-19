import { PrismaService } from '../prisma/prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(email: string, password: string, fullName: string, phone: string, role?: string): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    findById(id: string): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    getProfile(userId: string): Promise<{
        promoRegistration: {
            promoCode: {
                id: string;
                createdAt: Date;
                code: string;
                description: string | null;
                isActive: boolean;
                createdBy: string;
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
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    updateProfile(userId: string, updateData: any): Promise<{
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    createManager(email: string, password: string, fullName: string, phone: string): Promise<{
        id: string;
        email: string;
        password: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }>;
    getAllManagers(): Promise<{
        _count: {
            promoCodes: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }[]>;
    getAllWorkers(): Promise<{
        applications: {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        }[];
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
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        };
        _count: {
            applications: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }[]>;
    getManagerWorkers(managerId: string): Promise<{
        applications: {
            id: string;
            status: import(".prisma/client").$Enums.ApplicationStatus;
            appliedAt: Date;
        }[];
        promoRegistration: {
            promoCode: {
                id: string;
                createdAt: Date;
                code: string;
                description: string | null;
                isActive: boolean;
                createdBy: string;
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        };
        _count: {
            applications: number;
        };
        id: string;
        email: string;
        fullName: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
        bio: string | null;
        socialLinks: import("@prisma/client/runtime/library").JsonValue | null;
        agreedToTerms: boolean;
        agreedToPrivacy: boolean;
        createdAt: Date;
        updatedAt: Date;
        resetToken: string | null;
        resetTokenExpiry: Date | null;
    }[]>;
}
