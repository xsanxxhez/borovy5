import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
export declare class PromoCodesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreatePromoCodeDto): Promise<{
        creator: {
            id: string;
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
    }>;
    findAll(): Promise<({
        creator: {
            id: string;
            email: string;
            fullName: string;
            role: import(".prisma/client").$Enums.Role;
        };
        _count: {
            registrations: number;
        };
    } & {
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
    })[]>;
    findMyPromoCodes(userId: string): Promise<({
        _count: {
            registrations: number;
        };
    } & {
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
    })[]>;
    getPromoCodeStats(promoCodeId: string): Promise<{
        registrations: ({
            user: {
                id: string;
                email: string;
                fullName: string;
                createdAt: Date;
                _count: {
                    applications: number;
                };
            };
        } & {
            id: string;
            userId: string;
            promoCodeId: string;
            registeredAt: Date;
        })[];
    } & {
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
    }>;
    toggleActive(id: string): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
    }>;
    delete(id: string, userId: string): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
    }>;
    validatePromoCode(code: string): Promise<{
        valid: boolean;
        promoCode?: undefined;
    } | {
        valid: boolean;
        promoCode: {
            id: string;
            createdAt: Date;
            code: string;
            description: string | null;
            isActive: boolean;
            createdBy: string;
        };
    }>;
}
