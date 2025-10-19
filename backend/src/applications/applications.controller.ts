import { Controller, Post, Get, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { ApplicationsService } from './applications.service';
import { ApplyJobDto } from './dto/apply-job.dto';
import { UpdateApplicationStatusDto } from './dto/update-application-status.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('applications')
@UseGuards(JwtAuthGuard)
export class ApplicationsController {
  constructor(private applicationsService: ApplicationsService) {}

  @Post()
  @Roles('WORKER')
  @UseGuards(RolesGuard)
  async apply(@CurrentUser() user: any, @Body() dto: ApplyJobDto) {
    return this.applicationsService.apply(user.id, dto);
  }

  @Get('my')
  async getMyApplications(@CurrentUser() user: any) {
    return this.applicationsService.getMyApplications(user.id);
  }

  @Get()
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async getAllApplications() {
    return this.applicationsService.getAllApplications();
  }

  @Get('job/:jobId')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async getApplicationsByJob(@Param('jobId') jobId: string) {
    return this.applicationsService.getApplicationsByJob(jobId);
  }

  @Patch(':id/approve')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async approve(@Param('id') id: string, @Body() dto: UpdateApplicationStatusDto) {
    return this.applicationsService.approve(id, dto);
  }

  @Patch(':id/reject')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async reject(@Param('id') id: string) {
    return this.applicationsService.reject(id);
  }

  @Patch(':id/remove')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string) {
    return this.applicationsService.remove(id);
  }

  @Patch(':id/done')
  @Roles('ADMIN', 'MANAGER')
  @UseGuards(RolesGuard)
  async markAsDone(@Param('id') id: string) {
    return this.applicationsService.markAsDone(id);
  }
}
