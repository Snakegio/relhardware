import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';

@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles({ roles: ['realm:ADMIN'] })
  create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Roles({ roles: ['realm:MODIFY'] })
  findAll(): Promise<UserResponseDto[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['realm:READ'] })
  findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:ADMIN'] })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:ADMIN'] })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
