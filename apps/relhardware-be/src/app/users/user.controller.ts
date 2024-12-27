import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  @Get('admin')
  @Roles('admin')
  findAll() {
    return 'This is an admin endpoint';
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
