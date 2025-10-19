import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(email: string, password: string, fullName: string, phone: string, role: string = 'WORKER') {
    const existingUser = await this.prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        fullName,
        phone,
        role: role as any,
      },
    });

    return user;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async getProfile(userId: string) {
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
      throw new NotFoundException('User not found');
    }

    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, updateData: any) {
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

  async createManager(email: string, password: string, fullName: string, phone: string) {
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

  async getManagerWorkers(managerId: string) {
    // Простой способ - через промокоды менеджера
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
}
