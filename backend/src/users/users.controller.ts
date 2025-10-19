import { Controller, Get, Post, Put, Body, UseGuards, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.getProfile(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('profile')
  async updateProfile(@Request() req, @Body() updateData: any) {
    return this.usersService.updateProfile(req.user.userId, updateData);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('manager')
  async createManager(@Body() createManagerDto: { email: string; password: string; fullName: string; phone: string }) {
    return this.usersService.createManager(
      createManagerDto.email,
      createManagerDto.password,
      createManagerDto.fullName,
      createManagerDto.phone
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('managers')
  async getAllManagers() {
    return this.usersService.getAllManagers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('workers')
  async getAllWorkers() {
    return this.usersService.getAllWorkers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('MANAGER')
  @Get('manager/workers')
  async getManagerWorkers(@Request() req) {
    return this.usersService.getManagerWorkers(req.user.userId);
  }
}
