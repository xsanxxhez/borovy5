import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';

@Injectable()
export class PromoCodesService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreatePromoCodeDto) {
    const existingPromoCode = await this.prisma.promoCode.findUnique({
      where: { code: dto.code },
    });

    if (existingPromoCode) {
      throw new BadRequestException('Промокод с таким названием уже существует');
    }

    return this.prisma.promoCode.create({
      data: {
        code: dto.code,
        description: dto.description,
        createdBy: userId,
        isActive: true,
      },
      include: {
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.promoCode.findMany({
      include: {
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
          },
        },
        _count: {
          select: {
            registrations: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMyPromoCodes(userId: string) {
    return this.prisma.promoCode.findMany({
      where: { createdBy: userId },
      include: {
        _count: {
          select: {
            registrations: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getPromoCodeStats(promoCodeId: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id: promoCodeId },
      include: {
        registrations: {
          include: {
            user: {
              select: {
                id: true,
                fullName: true,
                email: true,
                createdAt: true,
                _count: {
                  select: {
                    applications: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!promoCode) {
      throw new BadRequestException('Промокод не найден');
    }

    return promoCode;
  }

  async toggleActive(id: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id },
    });

    if (!promoCode) {
      throw new BadRequestException('Промокод не найден');
    }

    return this.prisma.promoCode.update({
      where: { id },
      data: {
        isActive: !promoCode.isActive,
      },
    });
  }

  async delete(id: string, userId: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id },
    });

    if (!promoCode) {
      throw new BadRequestException('Промокод не найден');
    }

    return this.prisma.promoCode.delete({
      where: { id },
    });
  }

  async validatePromoCode(code: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { code },
    });

    if (!promoCode || !promoCode.isActive) {
      return { valid: false };
    }

    return { valid: true, promoCode };
  }
}
