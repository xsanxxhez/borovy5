import { PromoCodesService } from './promo-codes.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';
export declare class PromoCodesController {
    private promoCodesService;
    constructor(promoCodesService: PromoCodesService);
    create(user: any, dto: CreatePromoCodeDto): Promise<{
        creator: {
            id: string;
            email: string;
            fullName: string;
        };
    } & {
        id: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
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
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    })[]>;
    findMyPromoCodes(user: any): Promise<({
        _count: {
            registrations: number;
        };
    } & {
        id: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    })[]>;
    validatePromoCode(code: string): Promise<{
        valid: boolean;
        promoCode?: undefined;
    } | {
        valid: boolean;
        promoCode: {
            id: string;
            code: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            usedCount: number;
            createdBy: string;
        };
    }>;
    getPromoCodeStats(id: string): Promise<{
        registrations: ({
            user: {
                id: string;
                createdAt: Date;
                email: string;
                fullName: string;
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
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    }>;
    toggleActive(id: string, user: any): Promise<{
        id: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    }>;
    update(id: string, user: any, dto: UpdatePromoCodeDto): Promise<{
        creator: {
            id: string;
            email: string;
            fullName: string;
        };
        _count: {
            registrations: number;
        };
    } & {
        id: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    }>;
    delete(id: string, user: any): Promise<{
        id: string;
        code: string;
        description: string | null;
        isActive: boolean;
        createdAt: Date;
        usedCount: number;
        createdBy: string;
    }>;
}
