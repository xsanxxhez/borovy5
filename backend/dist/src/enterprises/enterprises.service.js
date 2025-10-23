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
exports.EnterprisesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let EnterprisesService = class EnterprisesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        return this.prisma.enterprise.create({
            data: {
                name: dto.name,
                description: dto.description,
                location: dto.location,
                contactInfo: dto.contactInfo,
                isActive: dto.isActive ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.enterprise.findMany({
            include: {
                _count: {
                    select: {
                        jobs: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
    async findOne(id) {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: { id },
            include: {
                jobs: {
                    include: {
                        _count: {
                            select: {
                                applications: true,
                            },
                        },
                    },
                },
            },
        });
        if (!enterprise) {
            throw new common_1.NotFoundException('Предприятие не найдено');
        }
        return enterprise;
    }
    async update(id, dto) {
        return this.prisma.enterprise.update({
            where: { id },
            data: {
                name: dto.name,
                description: dto.description,
                location: dto.location,
                contactInfo: dto.contactInfo,
                isActive: dto.isActive,
            },
        });
    }
    async remove(id) {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: { id },
            include: {
                jobs: {
                    include: {
                        _count: {
                            select: {
                                applications: true
                            }
                        }
                    }
                }
            }
        });
        if (!enterprise) {
            throw new common_1.NotFoundException('Предприятие не найдено');
        }
        const activeJobs = enterprise.jobs.filter(job => job.isActive);
        if (activeJobs.length > 0) {
            throw new common_1.BadRequestException(`Нельзя удалить предприятие с активными вакансиями. Активных вакансий: ${activeJobs.length}`);
        }
        return this.prisma.enterprise.delete({
            where: { id },
        });
    }
    async toggleActive(id) {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: { id },
        });
        if (!enterprise) {
            throw new common_1.NotFoundException('Предприятие не найдено');
        }
        return this.prisma.enterprise.update({
            where: { id },
            data: {
                isActive: !enterprise.isActive,
            },
        });
    }
};
exports.EnterprisesService = EnterprisesService;
exports.EnterprisesService = EnterprisesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnterprisesService);
//# sourceMappingURL=enterprises.service.js.map