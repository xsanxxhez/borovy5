import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ApplicationsService {
  constructor(private prisma: PrismaService) {}

  async apply(userId: string, jobId: string) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new NotFoundException('Работа не найдена');
    }

    if (!job.isActive) {
      throw new BadRequestException('Работа неактивна');
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
      throw new BadRequestException('Вы уже откликались на эту работу');
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

  async getMyApplications(userId: string) {
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

  async updateStatus(id: string, status: 'APPROVED' | 'REJECTED' | 'REMOVED' | 'DONE', workEndDate?: Date) {
    const application = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      throw new NotFoundException('Отклик не найден');
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

  async approve(id: string, workEndDate: Date) {
    return this.updateStatus(id, 'APPROVED', workEndDate);
  }

  async reject(id: string) {
    return this.updateStatus(id, 'REJECTED');
  }

  async remove(id: string) {
    return this.updateStatus(id, 'REMOVED');
  }

  async markAsDone(id: string) {
    return this.updateStatus(id, 'DONE');
  }

  async getApplicationsByJob(jobId: string) {
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
}
