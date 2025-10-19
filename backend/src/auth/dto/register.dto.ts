import { IsEmail, IsString, MinLength, IsPhoneNumber, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  fullName: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  promoCode: string;

  @ApiProperty()
  @IsBoolean()
  agreedToTerms: boolean;

  @ApiProperty()
  @IsBoolean()
  agreedToPrivacy: boolean;
}
