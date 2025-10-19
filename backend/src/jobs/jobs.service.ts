import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateJobDto) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id: dto.enterpriseId },
    });

    if (!enterprise) {
      throw new NotFoundException('Предприятие не найдено');
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

  async findOne(id: string) {
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
      throw new NotFoundException('Работа не найдена');
    }

    return job;
  }

  async findByEnterprise(enterpriseId: string) {
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

  async update(id: string, dto: UpdateJobDto) {
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

  async remove(id: string) {
    const activeApplications = await this.prisma.application.count({
      where: {
        jobId: id,
        status: {
          not: 'REMOVED',
        },
      },
    });

    if (activeApplications > 0) {
      throw new BadRequestException('Нельзя удалить работу с активными откликами');
    }

    return this.prisma.job.delete({
      where: { id },
    });
  }

  async toggleActive(id: string) {
    const job = await this.prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      throw new NotFoundException('Работа не найдена');
    }

    return this.prisma.job.update({
      where: { id },
      data: {
        isActive: !job.isActive,
      },
    });
  }
}
