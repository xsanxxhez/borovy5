import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, dto: ApplyJobDto) {
    const job = await this.prisma.job.findUnique({
      where: { id: dto.jobId },
    });

    if (!job) {
      throw new NotFoundException('Вакансия не найдена');
    }

    const existing = await this.prisma.application.findFirst({
      where: {
        userId: userId,
        jobId: dto.jobId,
      },
    });

    if (existing) {
      throw new BadRequestException('Вы уже откликнулись на эту вакансию');
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

  async getMyApplications(userId: string) {
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

  async getApplicationsByJob(jobId: string) {
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

  async approve(id: string, dto: UpdateApplicationStatusDto) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Отклик не найден');
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

  async reject(id: string) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Отклик не найден');
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

  async remove(id: string) {
    return this.prisma.application.update({
      where: { id },
      data: {
        status: 'REMOVED',
      },
    });
  }

  async markAsDone(id: string) {
    return this.prisma.application.update({
      where: { id },
      data: {
        status: 'DONE',
      },
    });
  }
}
