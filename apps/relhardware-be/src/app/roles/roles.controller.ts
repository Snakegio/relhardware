import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleResponseDto } from './dto/role-response.dto';
import { Resource, Roles } from 'nest-keycloak-connect';

@ApiBearerAuth()
@Controller('roles')
@Resource(Roles.name)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles({ roles: ['realm:ADMIN'] })
  create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles({ roles: ['realm:READ'] })
  findAll(): Promise<RoleResponseDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles({ roles: ['realm:READ'] })
  findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['realm:ADMIN'] })
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<RoleResponseDto> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles({ roles: ['realm:ADMIN'] })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
