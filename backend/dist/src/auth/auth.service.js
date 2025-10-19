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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email уже зарегистрирован');
        }
        let promoCode = null;
        if (dto.promoCode) {
            promoCode = await this.prisma.promoCode.findUnique({
                where: { code: dto.promoCode, isActive: true },
            });
            if (!promoCode) {
                throw new common_1.BadRequestException('Неверный промокод');
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
                phone: dto.phone,
                agreedToTerms: dto.agreedToTerms,
                agreedToPrivacy: dto.agreedToPrivacy,
            },
        });
        if (promoCode) {
            await this.prisma.promoRegistration.create({
                data: {
                    userId: user.id,
                    promoCodeId: promoCode.id,
                },
            });
            const currentCount = await this.prisma.promoRegistration.count({
                where: { promoCodeId: promoCode.id },
            });
            await this.prisma.promoCode.update({
                where: { id: promoCode.id },
                data: {
                    usedCount: currentCount,
                },
            });
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
            },
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
            select: {
                id: true,
                email: true,
                password: true,
                fullName: true,
                role: true,
                phone: true,
                bio: true,
                avatar: true,
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Неверный email или пароль');
        }
        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Неверный email или пароль');
        }
        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role,
                phone: user.phone,
                bio: user.bio,
                avatar: user.avatar,
            },
        };
    }
    async requestPasswordReset(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user) {
            return { message: 'Если email существует, письмо с инструкциями отправлено' };
        }
        const resetToken = Math.random().toString(36).substring(2, 15);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
            },
        });
        console.log('Reset token:', resetToken);
        return { message: 'Если email существует, письмо с инструкциями отправлено' };
    }
    async resetPassword(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                resetToken: dto.token,
            },
        });
        if (!user) {
            throw new common_1.BadRequestException('Неверный или истёкший токен');
        }
        const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
            },
        });
        return { message: 'Пароль успешно изменён' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map