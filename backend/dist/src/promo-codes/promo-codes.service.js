"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromoCodesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PromoCodesService = class PromoCodesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        const existingPromoCode = await this.prisma.promoCode.findUnique({
            where: { code: dto.code },
        });
        if (existingPromoCode) {
            throw new common_1.BadRequestException('Промокод с таким названием уже существует');
        }
        return this.prisma.promoCode.create({
            data: {
                code: dto.code,
                description: dto.description,
                createdBy: userId,
                isActive: true,
            },
            include: {
                creator: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.promoCode.findMany({
            include: {
                creator: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        role: true,
                    },
                },
                _count: {
                    select: {
                        registrations: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findMyPromoCodes(userId) {
        return this.prisma.promoCode.findMany({
            where: { createdBy: userId },
            include: {
                _count: {
                    select: {
                        registrations: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async getPromoCodeStats(promoCodeId) {
        const promoCode = await this.prisma.promoCode.findUnique({
            where: { id: promoCodeId },
            include: {
                registrations: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                fullName: true,
                                email: true,
                                createdAt: true,
                                _count: {
                                    select: {
                                        applications: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!promoCode) {
            throw new common_1.BadRequestException('Промокод не найден');
        }
        return promoCode;
    }
    async toggleActive(id) {
        const promoCode = await this.prisma.promoCode.findUnique({
            where: { id },
        });
        if (!promoCode) {
            throw new common_1.BadRequestException('Промокод не найден');
        }
        return this.prisma.promoCode.update({
            where: { id },
            data: {
                isActive: !promoCode.isActive,
            },
        });
    }
    async delete(id, userId) {
        const promoCode = await this.prisma.promoCode.findUnique({
            where: { id },
        });
        if (!promoCode) {
            throw new common_1.BadRequestException('Промокод не найден');
        }
        return this.prisma.promoCode.delete({
            where: { id },
        });
    }
    async validatePromoCode(code) {
        const promoCode = await this.prisma.promoCode.findUnique({
            where: { code },
        });
        if (!promoCode || !promoCode.isActive) {
            return { valid: false };
        }
        return { valid: true, promoCode };
    }
};
exports.PromoCodesService = PromoCodesService;
exports.PromoCodesService = PromoCodesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PromoCodesService);
//# sourceMappingURL=promo-codes.service.js.map