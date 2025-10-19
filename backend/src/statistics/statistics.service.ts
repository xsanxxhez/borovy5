import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getWorkerStats(userId: string) {
    const totalApplications = await this.prisma.application.count({
      where: { userId },
    });

    const approvedApplications = await this.prisma.application.count({
      where: { userId, status: 'APPROVED' },
    });

    const rejectedApplications = await this.prisma.application.count({
      where: { userId, status: 'REJECTED' },
    });

    const pendingApplications = await this.prisma.application.count({
      where: { userId, status: 'APPLIED' },
    });

    const doneApplications = await this.prisma.application.count({
      where: { userId, status: 'DONE' },
    });

    return {
      totalApplications,
      approvedApplications,
      rejectedApplications,
      pendingApplications,
      doneApplications,
    };
  }

  async getManagerStats(userId: string) {
    const myPromoCodes = await this.prisma.promoCode.findMany({
      where: { createdBy: userId },
      include: {
        registrations: true,
      },
    });

    const totalPromoCodes = myPromoCodes.length;
    const activePromoCodes = myPromoCodes.filter(pc => pc.isActive).length;
    const totalRegistrations = myPromoCodes.reduce((sum, pc) => sum + pc.registrations.length, 0);

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const registrationsLastMonth = await this.prisma.promoRegistration.count({
      where: {
        promoCode: {
          createdBy: userId,
        },
        registeredAt: {
          gte: lastMonth,
        },
      },
    });

    const myWorkers = await this.prisma.user.findMany({
      where: {
        promoRegistration: {
          promoCode: {
            createdBy: userId,
          },
        },
      },
      include: {
        _count: {
          select: {
            applications: true,
          },
        },
        applications: {
          where: {
            status: 'APPROVED',
          },
        },
      },
    });

    return {
      totalPromoCodes,
      activePromoCodes,
      totalRegistrations,
      registrationsLastMonth,
      totalWorkers: myWorkers.length,
      workers: myWorkers.map(worker => ({
        id: worker.id,
        fullName: worker.fullName,
        email: worker.email,
        createdAt: worker.createdAt,
        totalApplications: worker._count.applications,
        approvedApplications: worker.applications.length,
      })),
    };
  }

  async getAdminStats() {
    const totalUsers = await this.prisma.user.count();
    const totalWorkers = await this.prisma.user.count({ where: { role: 'WORKER' } });
    const totalManagers = await this.prisma.user.count({ where: { role: 'MANAGER' } });
    const totalAdmins = await this.prisma.user.count({ where: { role: 'ADMIN' } });

    const totalEnterprises = await this.prisma.enterprise.count();
    const activeEnterprises = await this.prisma.enterprise.count({ where: { isActive: true } });

    const totalJobs = await this.prisma.job.count();
    const activeJobs = await this.prisma.job.count({ where: { isActive: true } });

    const totalApplications = await this.prisma.application.count();
    const appliedApplications = await this.prisma.application.count({ where: { status: 'APPLIED' } });
    const approvedApplications = await this.prisma.application.count({ where: { status: 'APPROVED' } });
    const rejectedApplications = await this.prisma.application.count({ where: { status: 'REJECTED' } });
    const doneApplications = await this.prisma.application.count({ where: { status: 'DONE' } });

    const totalPromoCodes = await this.prisma.promoCode.count();
    const activePromoCodes = await this.prisma.promoCode.count({ where: { isActive: true } });

    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    const newUsersLastMonth = await this.prisma.user.count({
      where: {
        createdAt: {
          gte: lastMonth,
        },
      },
    });

    const newApplicationsLastMonth = await this.prisma.application.count({
      where: {
        appliedAt: {
          gte: lastMonth,
        },
      },
    });

    return {
      users: {
        total: totalUsers,
        workers: totalWorkers,
        managers: totalManagers,
        admins: totalAdmins,
        newLastMonth: newUsersLastMonth,
      },
      enterprises: {
        total: totalEnterprises,
        active: activeEnterprises,
      },
      jobs: {
        total: totalJobs,
        active: activeJobs,
      },
      applications: {
        total: totalApplications,
        applied: appliedApplications,
        approved: approvedApplications,
        rejected: rejectedApplications,
        done: doneApplications,
        newLastMonth: newApplicationsLastMonth,
      },
      promoCodes: {
        total: totalPromoCodes,
        active: activePromoCodes,
      },
    };
  }
}
