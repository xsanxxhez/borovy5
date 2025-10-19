import { IsDate, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class UpdateApplicationStatusDto {
  @ApiPropertyOptional()
  @IsDate()
  @IsOptional()
  @Type(() => Date)
  workEndDate?: Date;
}
