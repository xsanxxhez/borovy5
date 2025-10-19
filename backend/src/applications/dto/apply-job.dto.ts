import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ApplyJobDto {
  @ApiProperty()
  @IsUUID()
  jobId: string;
}
