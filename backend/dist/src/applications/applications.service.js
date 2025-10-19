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
exports.ApplicationsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ApplicationsService = class ApplicationsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async apply(userId, jobId) {
        const job = await this.prisma.job.findUnique({
            where: { id: jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Работа не найдена');
        }
        if (!job.isActive) {
            throw new common_1.BadRequestException('Работа неактивна');
        }
        const existingApplication = await this.prisma.application.findUnique({
            where: {
                jobId_userId: {
                    jobId,
                    userId,
                },
            },
        });
        if (existingApplication) {
            throw new common_1.BadRequestException('Вы уже откликались на эту работу');
        }
        return this.prisma.application.create({
            data: {
                jobId,
                userId,
                status: 'APPLIED',
            },
            include: {
                job: {
                    include: {
                        enterprise: {
                            select: {
                                name: true,
                                location: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async getMyApplications(userId) {
        return this.prisma.application.findMany({
            where: { userId },
            include: {
                job: {
                    include: {
                        enterprise: {
                            select: {
                                name: true,
                                location: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });
    }
    async getAllApplications() {
        return this.prisma.application.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                        avatar: true,
                    },
                },
                job: {
                    include: {
                        enterprise: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });
    }
    async updateStatus(id, status, workEndDate) {
        const application = await this.prisma.application.findUnique({
            where: { id },
        });
        if (!application) {
            throw new common_1.NotFoundException('Отклик не найден');
        }
        return this.prisma.application.update({
            where: { id },
            data: {
                status,
                workEndDate: workEndDate || undefined,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                job: {
                    select: {
                        title: true,
                    },
                },
            },
        });
    }
    async approve(id, workEndDate) {
        return this.updateStatus(id, 'APPROVED', workEndDate);
    }
    async reject(id) {
        return this.updateStatus(id, 'REJECTED');
    }
    async remove(id) {
        return this.updateStatus(id, 'REMOVED');
    }
    async markAsDone(id) {
        return this.updateStatus(id, 'DONE');
    }
    async getApplicationsByJob(jobId) {
        return this.prisma.application.findMany({
            where: { jobId },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                        phone: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });
    }
};
exports.ApplicationsService = ApplicationsService;
exports.ApplicationsService = ApplicationsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ApplicationsService);
//# sourceMappingURL=applications.service.js.map