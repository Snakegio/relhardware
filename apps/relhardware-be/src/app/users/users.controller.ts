import { Controller, Get, Param } from '@nestjs/common';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { UserService } from './user.service';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly keycloakService: UserService) {}

  @Get()
  @Roles({ roles: ['realm:MODIFY'] })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.keycloakService.getUsers();
  }

  @Get(':id')
  @Roles({ roles: ['realm:READ'] })
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.keycloakService.findById(id);
  }
}
