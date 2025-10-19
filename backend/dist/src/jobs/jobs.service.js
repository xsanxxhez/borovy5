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
exports.JobsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let JobsService = class JobsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: { id: dto.enterpriseId },
        });
        if (!enterprise) {
            throw new common_1.NotFoundException('Предприятие не найдено');
        }
        return this.prisma.job.create({
            data: {
                enterpriseId: dto.enterpriseId,
                title: dto.title,
                description: dto.description,
                requirements: dto.requirements,
                salaryMin: dto.salaryMin,
                salaryMax: dto.salaryMax,
                workConditions: dto.workConditions,
                location: dto.location,
                isActive: dto.isActive ?? true,
            },
            include: {
                enterprise: true,
            },
        });
    }
    async findAll() {
        return this.prisma.job.findMany({
            where: { isActive: true },
            include: {
                enterprise: {
                    select: {
                        name: true,
                        location: true,
                    },
                },
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findAllForAdmin() {
        return this.prisma.job.findMany({
            include: {
                enterprise: true,
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
            include: {
                enterprise: true,
                applications: {
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
                },
            },
        });
        if (!job) {
            throw new common_1.NotFoundException('Работа не найдена');
        }
        return job;
    }
    async findByEnterprise(enterpriseId) {
        return this.prisma.job.findMany({
            where: { enterpriseId },
            include: {
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async update(id, dto) {
        return this.prisma.job.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                requirements: dto.requirements,
                salaryMin: dto.salaryMin,
                salaryMax: dto.salaryMax,
                workConditions: dto.workConditions,
                location: dto.location,
                isActive: dto.isActive,
            },
            include: {
                enterprise: true,
            },
        });
    }
    async remove(id) {
        const activeApplications = await this.prisma.application.count({
            where: {
                jobId: id,
                status: {
                    not: 'REMOVED',
                },
            },
        });
        if (activeApplications > 0) {
            throw new common_1.BadRequestException('Нельзя удалить работу с активными откликами');
        }
        return this.prisma.job.delete({
            where: { id },
        });
    }
    async toggleActive(id) {
        const job = await this.prisma.job.findUnique({
            where: { id },
        });
        if (!job) {
            throw new common_1.NotFoundException('Работа не найдена');
        }
        return this.prisma.job.update({
            where: { id },
            data: {
                isActive: !job.isActive,
            },
        });
    }
};
exports.JobsService = JobsService;
exports.JobsService = JobsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JobsService);
//# sourceMappingURL=jobs.service.js.map