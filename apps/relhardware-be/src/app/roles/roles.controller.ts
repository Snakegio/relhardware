import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { RolesGuard } from '../auth/guard/roles.guard';
import { Roles } from '../auth/decorator/roles.decorator';
import { ReadPermission } from '../auth/decorator/read-permission.decorator';
import { PermissionGuard } from '../auth/guard/permission-guard.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleResponseDto } from './dto/role-response.dto';

@ApiBearerAuth()
@Controller('roles')
@UseGuards(JwtAuthGuard, RolesGuard, PermissionGuard)
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('admin')
  create(@Body() createRoleDto: CreateRoleDto): Promise<RoleResponseDto> {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @ReadPermission()
  findAll(): Promise<RoleResponseDto[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @ReadPermission()
  findOne(@Param('id') id: string): Promise<RoleResponseDto> {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  @Roles('admin')
  update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<RoleResponseDto> {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
