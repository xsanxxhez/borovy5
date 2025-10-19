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
    async create(email, password, fullName, phone, role = 'WORKER') {
        const existingUser = await this.prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullName,
                phone,
                role: role,
            },
        });
        return user;
    }
    async findByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async findById(id) {
        return this.prisma.user.findUnique({ where: { id } });
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                promoRegistration: {
                    include: {
                        promoCode: true,
                    },
                },
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, ...result } = user;
        return result;
    }
    async updateProfile(userId, updateData) {
        const user = await this.prisma.user.update({
            where: { id: userId },
            data: {
                fullName: updateData.fullName,
                phone: updateData.phone,
                bio: updateData.bio,
            },
        });
        const { password, ...result } = user;
        return result;
    }
    async createManager(email, password, fullName, phone) {
        return this.create(email, password, fullName, phone, 'MANAGER');
    }
    async getAllManagers() {
        const managers = await this.prisma.user.findMany({
            where: { role: 'MANAGER' },
            include: {
                _count: {
                    select: {
                        promoCodes: true,
                    },
                },
            },
        });
        return managers.map(manager => {
            const { password, ...result } = manager;
            return result;
        });
    }
    async getAllWorkers() {
        const workers = await this.prisma.user.findMany({
            where: { role: 'WORKER' },
            include: {
                promoRegistration: {
                    include: {
                        promoCode: {
                            include: {
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
                    },
                },
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
        });
        return workers.map(worker => {
            const { password, ...result } = worker;
            return result;
        });
    }
    async getManagerWorkers(managerId) {
        const workers = await this.prisma.user.findMany({
            where: {
                role: 'WORKER',
                promoRegistration: {
                    promoCode: {
                        createdBy: managerId,
                    },
                },
            },
            include: {
                promoRegistration: {
                    include: {
                        promoCode: true,
                    },
                },
                applications: {
                    select: {
                        id: true,
                        status: true,
                        appliedAt: true,
                    },
                },
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
        });
        return workers.map(worker => {
            const { password, ...result } = worker;
            return result;
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map