import { Module } from '@nestjs/common';
import { PromoCodesService } from './promo-codes.service';
import { PromoCodesController } from './promo-codes.controller';

@Module({
  providers: [PromoCodesService],
  controllers: [PromoCodesController],
})
export class PromoCodesModule {}
