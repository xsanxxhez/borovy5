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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = require("bcrypt");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        return this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                bio: true,
                avatar: true,
                createdAt: true,
            },
        });
    }
    async updateProfile(userId, dto) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                fullName: dto.fullName,
                phone: dto.phone,
                bio: dto.bio,
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
                bio: true,
                avatar: true,
            },
        });
    }
    async deleteWorker(userId) {
        const worker = await this.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, role: true, email: true }
        });
        if (!worker) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        if (worker.role !== 'WORKER') {
            throw new common_1.ConflictException('Можно удалять только работников');
        }
        const deletedWorker = await this.prisma.user.delete({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                fullName: true
            }
        });
        return {
            message: 'Работник успешно удален',
            deletedWorker
        };
    }
    async deleteManager(managerId) {
        const manager = await this.prisma.user.findUnique({
            where: { id: managerId },
            select: { id: true, role: true, email: true }
        });
        if (!manager) {
            throw new common_1.NotFoundException('Пользователь не найден');
        }
        if (manager.role !== 'MANAGER') {
            throw new common_1.ConflictException('Можно удалять только менеджеров');
        }
        const managerPromoCodes = await this.prisma.promoCode.findMany({
            where: { createdBy: managerId },
            select: { id: true }
        });
        const promoCodeIds = managerPromoCodes.map(pc => pc.id);
        if (promoCodeIds.length > 0) {
            await this.prisma.promoRegistration.deleteMany({
                where: {
                    promoCodeId: { in: promoCodeIds }
                }
            });
            await this.prisma.promoCode.deleteMany({
                where: { createdBy: managerId }
            });
        }
        const deletedManager = await this.prisma.user.delete({
            where: { id: managerId },
            select: {
                id: true,
                email: true,
                fullName: true
            }
        });
        return {
            message: 'Менеджер успешно удален',
            deletedManager,
            deletedPromoCodes: promoCodeIds.length
        };
    }
    async createManager(dto) {
        const existing = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existing) {
            throw new common_1.ConflictException('Email уже используется');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
                fullName: dto.fullName,
                phone: dto.phone,
                role: 'MANAGER',
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                role: true,
            },
        });
    }
    async getAllManagers() {
        const managers = await this.prisma.user.findMany({
            where: { role: 'MANAGER' },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                createdAt: true,
                promoCodes: {
                    select: {
                        id: true,
                        code: true,
                        usedCount: true,
                        isActive: true,
                        _count: {
                            select: {
                                registrations: true,
                            },
                        },
                    },
                },
            },
        });
        return managers.map(manager => {
            const totalRegistrations = manager.promoCodes.reduce((sum, promo) => sum + promo._count.registrations, 0);
            return {
                ...manager,
                _count: {
                    promoCodes: manager.promoCodes.length,
                    registrations: totalRegistrations,
                },
            };
        });
    }
    async getAllWorkers() {
        return this.prisma.user.findMany({
            where: { role: 'WORKER' },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                createdAt: true,
                promoRegistration: {
                    select: {
                        promoCode: {
                            select: {
                                code: true,
                                creator: {
                                    select: {
                                        fullName: true,
                                        email: true,
                                    },
                                },
                            },
                        },
                    },
                },
                applications: {
                    select: {
                        id: true,
                        status: true,
                        appliedAt: true,
                        job: {
                            select: {
                                title: true,
                                enterprise: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
        });
    }
    async getManagerWorkers(managerId) {
        const promoCodes = await this.prisma.promoCode.findMany({
            where: { createdBy: managerId },
            select: { id: true },
        });
        const promoCodeIds = promoCodes.map((pc) => pc.id);
        return this.prisma.user.findMany({
            where: {
                promoRegistration: {
                    promoCodeId: { in: promoCodeIds },
                },
            },
            select: {
                id: true,
                email: true,
                fullName: true,
                phone: true,
                createdAt: true,
                promoRegistration: {
                    select: {
                        promoCode: {
                            select: {
                                code: true,
                            },
                        },
                        registeredAt: true,
                    },
                },
                applications: {
                    select: {
                        id: true,
                        status: true,
                        job: {
                            select: {
                                title: true,
                                enterprise: {
                                    select: {
                                        name: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map