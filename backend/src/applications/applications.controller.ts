import { 
  Controller, 
  Get, 
  Post, 
  Patch,
  Body, 
  Param, 
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ApplicationsService } from './applications.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('WORKER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Откликнуться на работу (только работник)' })
  apply(@CurrentUser() user: any, @Body() dto: ApplyJobDto) {
    return this.applicationsService.apply(user.id, dto.jobId);
  }

  @Get('my')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('WORKER')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить мои отклики (только работник)' })
  getMyApplications(@CurrentUser() user: any) {
    return this.applicationsService.getMyApplications(user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить все отклики (только админ)' })
  getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get('job/:jobId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Получить отклики по работе (только админ)' })
  getApplicationsByJob(@Param('jobId') jobId: string) {
    return this.applicationsService.getApplicationsByJob(jobId);
  }

  @Patch(':id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Одобрить отклик (только админ)' })
  approve(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.applicationsService.approve(id, dto.workEndDate);
  }

  @Patch(':id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Отклонить отклик (только админ)' })
  reject(@Param('id') id: string) {
    return this.applicationsService.reject(id);
  }

  @Patch(':id/remove')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить работника с работы (только админ)' })
  remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }

  @Patch(':id/done')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Отметить работу как завершенную (только админ)' })
  markAsDone(@Param('id') id: string) {
    return this.applicationsService.markAsDone(id);
  }
}
