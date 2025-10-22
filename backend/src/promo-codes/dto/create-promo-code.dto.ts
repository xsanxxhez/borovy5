import { IsString, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePromoCodeDto {
@ApiProperty({
description: 'Уникальный код промокода',
example: 'SUMMER2024',
minLength: 3,
maxLength: 20
})
@IsString()
@MinLength(3, { message: 'Код промокода должен содержать минимум 3 символа' })
@MaxLength(20, { message: 'Код промокода не должен превышать 20 символов' })
@Matches(/^[A-Z0-9_]+$/, {
message: 'Код промокода может содержать только заглавные буквы, цифры и символ подчеркивания'
})
code: string;

@ApiPropertyOptional({
description: 'Описание промокода',
example: 'Промокод для летней акции 2024',
maxLength: 255
})
@IsString()
@IsOptional()
@MaxLength(255, { message: 'Описание не должно превышать 255 символов' })
description?: string;
}