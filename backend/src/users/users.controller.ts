import { Controller, Get, Put, Post, Delete, Body, UseGuards, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateManagerDto } from './dto/create-manager.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';


@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  async getProfile(@CurrentUser() user: any) {
    return this.usersService.getProfile(user.id);
  }

  @Put('profile')
  async updateProfile(@CurrentUser() user: any, @Body() dto: UpdateProfileDto) {
    return this.usersService.updateProfile(user.id, dto);
  }

  @Post('manager')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async createManager(@Body() createManagerDto: CreateManagerDto) {
    return this.usersService.createManager(createManagerDto);
  }

  @Get('managers')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async getAllManagers() {
    return this.usersService.getAllManagers();
  }

  @Get('workers')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async getAllWorkers() {
    return this.usersService.getAllWorkers();
  }
  @Delete('worker/:id')
@Roles('ADMIN')
@UseGuards(RolesGuard)
async deleteWorker(@Param('id') id: string) {
  return this.usersService.deleteWorker(id);
}

  @Get('manager/workers')
  @Roles('MANAGER')
  @UseGuards(RolesGuard)
  async getManagerWorkers(@CurrentUser() user: any) {
    return this.usersService.getManagerWorkers(user.id);
  }
}
