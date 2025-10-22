import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';
import { UpdatePromoCodeDto } from './dto/update-promo-code.dto';

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

  async toggleActive(id: string, userId: string) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id },
    });

    if (!promoCode) {
      throw new BadRequestException('Промокод не найден');
    }

    // Проверяем права доступа (только создатель или админ)
    if (promoCode.createdBy !== userId) {
      throw new ForbiddenException('Вы можете изменять только свои промокоды');
    }

    return this.prisma.promoCode.update({
      where: { id },
      data: {
        isActive: !promoCode.isActive,
      },
    });
  }

  async update(id: string, userId: string, dto: UpdatePromoCodeDto) {
    const promoCode = await this.prisma.promoCode.findUnique({
      where: { id },
    });

    if (!promoCode) {
      throw new BadRequestException('Промокод не найден');
    }

    // Проверяем права доступа (только создатель или админ)
    if (promoCode.createdBy !== userId) {
      throw new ForbiddenException('Вы можете редактировать только свои промокоды');
    }

    // Проверяем уникальность кода, если он изменяется
    if (dto.code && dto.code !== promoCode.code) {
      const existingPromoCode = await this.prisma.promoCode.findUnique({
        where: { code: dto.code },
      });

      if (existingPromoCode) {
        throw new BadRequestException('Промокод с таким названием уже существует');
      }
    }

    return this.prisma.promoCode.update({
      where: { id },
      data: {
        code: dto.code,
        description: dto.description,
      },
      include: {
        creator: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
        _count: {
          select: {
            registrations: true,
          },
        },
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

    // Проверяем права доступа (только создатель или админ)
    if (promoCode.createdBy !== userId) {
      throw new ForbiddenException('Вы можете удалять только свои промокоды');
    }

    // Проверяем, есть ли регистрации по этому промокоду
    const registrationsCount = await this.prisma.promoRegistration.count({
      where: { promoCodeId: id },
    });

    if (registrationsCount > 0) {
      throw new BadRequestException('Нельзя удалить промокод, по которому есть регистрации');
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