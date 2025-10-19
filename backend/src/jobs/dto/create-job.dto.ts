import { IsString, IsOptional, IsInt, IsBoolean, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateJobDto {
  @ApiProperty()
  @IsUUID()
  enterpriseId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  requirements?: string;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  salaryMin?: number;

  @ApiPropertyOptional()
  @IsInt()
  @IsOptional()
  salaryMax?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  workConditions?: string;

  @ApiProperty()
  @IsString()
  location: string;

  @ApiPropertyOptional()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
