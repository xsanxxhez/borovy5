import { Injectable, UnauthorizedException, BadRequestException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RequestPasswordResetDto } from './dto/request-password-reset.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email уже зарегистрирован');
    }

    let promoCode = null;
    if (dto.promoCode) {
      promoCode = await this.prisma.promoCode.findUnique({
        where: { code: dto.promoCode, isActive: true },
      });

      if (!promoCode) {
        throw new BadRequestException('Неверный промокод');
      }
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        fullName: dto.fullName,
        phone: dto.phone,
        agreedToTerms: dto.agreedToTerms,
        agreedToPrivacy: dto.agreedToPrivacy,
      },
    });

    if (promoCode) {
      await this.prisma.promoRegistration.create({
        data: {
          userId: user.id,
          promoCodeId: promoCode.id,
        },
      });

      // Обновляем счётчик промокода
      const currentCount = await this.prisma.promoRegistration.count({
        where: { promoCodeId: promoCode.id },
      });

      await this.prisma.promoCode.update({
        where: { id: promoCode.id },
        data: {
          usedCount: currentCount,
        },
      });
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      select: {
        id: true,
        email: true,
        password: true,
        fullName: true,
        role: true,
        phone: true,
        bio: true,
        avatar: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Неверный email или пароль');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
      },
    };
  }

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      return { message: 'Если email существует, письмо с инструкциями отправлено' };
    }

    const resetToken = Math.random().toString(36).substring(2, 15);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        resetToken,
      },
    });

    // TODO: Отправка email с токеном
    console.log('Reset token:', resetToken);

    return { message: 'Если email существует, письмо с инструкциями отправлено' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        resetToken: dto.token,
      },
    });

    if (!user) {
      throw new BadRequestException('Неверный или истёкший токен');
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
      },
    });

    return { message: 'Пароль успешно изменён' };
  }
}
