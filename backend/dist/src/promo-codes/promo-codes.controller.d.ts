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
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
        usedCount: number;
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
        usedCount: number;
    })[]>;
    findMyPromoCodes(user: any): Promise<({
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
        usedCount: number;
    })[]>;
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
            usedCount: number;
        };
    }>;
    getPromoCodeStats(id: string): Promise<{
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
        usedCount: number;
    }>;
    toggleActive(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
        usedCount: number;
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
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
        usedCount: number;
    }>;
    delete(id: string, user: any): Promise<{
        id: string;
        createdAt: Date;
        code: string;
        description: string | null;
        isActive: boolean;
        createdBy: string;
        usedCount: number;
    }>;
}
