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
    async apply(userId, dto) {
        const job = await this.prisma.job.findUnique({
            where: { id: dto.jobId },
        });
        if (!job) {
            throw new common_1.NotFoundException('Вакансия не найдена');
        }
        const existing = await this.prisma.application.findFirst({
            where: {
                userId: userId,
                jobId: dto.jobId,
            },
        });
        if (existing) {
            throw new common_1.BadRequestException('Вы уже откликнулись на эту вакансию');
        }
        return this.prisma.application.create({
            data: {
                userId,
                jobId: dto.jobId,
            },
            include: {
                job: {
                    include: {
                        enterprise: true,
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
                        enterprise: true,
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
                        email: true,
                        fullName: true,
                        phone: true,
                        avatar: true,
                    },
                },
                job: {
                    include: {
                        enterprise: true,
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });
    }
    async getApplicationsByJob(jobId) {
        return this.prisma.application.findMany({
            where: { jobId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        fullName: true,
                        phone: true,
                        bio: true,
                        avatar: true,
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });
    }
    async approve(id, dto) {
        const application = await this.prisma.application.findUnique({
            where: { id },
        });
        if (!application) {
            throw new common_1.NotFoundException('Отклик не найден');
        }
        return this.prisma.application.update({
            where: { id },
            data: {
                status: 'APPROVED',
                workEndDate: dto.workEndDate ? new Date(dto.workEndDate) : undefined,
            },
            include: {
                user: true,
                job: {
                    include: {
                        enterprise: true,
                    },
                },
            },
        });
    }
    async reject(id) {
        const application = await this.prisma.application.findUnique({
            where: { id },
        });
        if (!application) {
            throw new common_1.NotFoundException('Отклик не найден');
        }
        return this.prisma.application.update({
            where: { id },
            data: {
                status: 'REJECTED',
            },
            include: {
                user: true,
                job: true,
            },
        });
    }
    async remove(id) {
        return this.prisma.application.update({
            where: { id },
            data: {
                status: 'REMOVED',
            },
        });
    }
    async markAsDone(id) {
        return this.prisma.application.update({
            where: { id },
            data: {
                status: 'DONE',
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