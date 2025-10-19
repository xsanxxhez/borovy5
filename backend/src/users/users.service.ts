import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        bio: true,
        avatar: true,
        createdAt: true,
      },
    });
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        fullName: dto.fullName,
        phone: dto.phone,
        bio: dto.bio,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
        bio: true,
        avatar: true,
      },
    });
  }

  async createManager(dto: CreateManagerDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existing) {
      throw new ConflictException('Email уже используется');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        phone: dto.phone,
        role: 'MANAGER',
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        role: true,
      },
    });
  }

  async getAllManagers() {
    return this.prisma.user.findMany({
      where: { role: 'MANAGER' },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
        promoCodes: {
          select: {
            id: true,
            code: true,
            usedCount: true,
            isActive: true,
          },
        },
      },
    });
  }

  async getAllWorkers() {
    return this.prisma.user.findMany({
      where: { role: 'WORKER' },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
        promoRegistration: {
          select: {
            promoCode: {
              select: {
                code: true,
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
      },
    });
  }

  async getManagerWorkers(managerId: string) {
    const promoCodes = await this.prisma.promoCode.findMany({
      where: { createdBy: managerId },
      select: { id: true },
    });

    const promoCodeIds = promoCodes.map((pc) => pc.id);

    return this.prisma.user.findMany({
      where: {
        promoRegistration: {
          promoCodeId: { in: promoCodeIds },
        },
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        phone: true,
        createdAt: true,
        promoRegistration: {
          select: {
            promoCode: {
              select: {
                code: true,
              },
            },
            registeredAt: true,
          },
        },
        applications: {
          select: {
            id: true,
            status: true,
            job: {
              select: {
                title: true,
                enterprise: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
