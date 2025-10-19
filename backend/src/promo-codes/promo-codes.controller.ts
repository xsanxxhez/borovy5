import { 
  Controller, 
  Get, 
  Post, 
  Delete,
  Patch,
  Body, 
  Param, 
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { PromoCodesService } from './promo-codes.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { CreatePromoCodeDto } from './dto/create-promo-code.dto';

@ApiTags('promo-codes')
@Controller('promo-codes')
export class PromoCodesController {
  constructor(private promoCodesService: PromoCodesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Создать промокод (админ и менеджер)' })
  create(@CurrentUser() user: any, @Body() dto: CreatePromoCodeDto) {
    return this.promoCodesService.create(user.id, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить все промокоды (только админ)' })
  findAll() {
    return this.promoCodesService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить мои промокоды (менеджер и админ)' })
  findMyPromoCodes(@CurrentUser() user: any) {
    return this.promoCodesService.findMyPromoCodes(user.id);
  }

  @Get('validate')
  @ApiOperation({ summary: 'Проверить валидность промокода (публичный)' })
  validatePromoCode(@Query('code') code: string) {
    return this.promoCodesService.validatePromoCode(code);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить статистику по промокоду (менеджер и админ)' })
  getPromoCodeStats(@Param('id') id: string) {
    return this.promoCodesService.getPromoCodeStats(id);
  }

  @Patch(':id/toggle-active')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Переключить активность промокода (менеджер и админ)' })
  toggleActive(@Param('id') id: string) {
    return this.promoCodesService.toggleActive(id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN', 'MANAGER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить промокод (менеджер и админ)' })
  delete(@Param('id') id: string, @CurrentUser() user: any) {
    return this.promoCodesService.delete(id, user.id);
  }
}
