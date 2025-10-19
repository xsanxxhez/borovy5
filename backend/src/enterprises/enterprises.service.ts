import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnterpriseDto } from './dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from './dto/update-enterprise.dto';

@Injectable()
export class EnterprisesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEnterpriseDto) {
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

  async findOne(id: string) {
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
      throw new NotFoundException('Предприятие не найдено');
    }

    return enterprise;
  }

  async update(id: string, dto: UpdateEnterpriseDto) {
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

  async remove(id: string) {
    const activeJobs = await this.prisma.job.count({
      where: {
        enterpriseId: id,
        isActive: true,
      },
    });

    if (activeJobs > 0) {
      throw new BadRequestException('Нельзя удалить предприятие с активными работами');
    }

    return this.prisma.enterprise.delete({
      where: { id },
    });
  }

  async toggleActive(id: string) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id },
    });

    if (!enterprise) {
      throw new NotFoundException('Предприятие не найдено');
    }

    return this.prisma.enterprise.update({
      where: { id },
      data: {
        isActive: !enterprise.isActive,
      },
    });
  }
}
