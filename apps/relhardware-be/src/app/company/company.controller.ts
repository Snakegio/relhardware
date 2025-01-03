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
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { PermissionGuard } from '../auth/guard/permission-guard.service';
import { RolesGuard } from '../auth/guard/roles.guard';
import { ReadPermission } from '../auth/decorator/read-permission.decorator';
import { ModifyPermission } from '../auth/decorator/modify-permission.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CompanyResponseDto } from './dto/company-response.dto';

@ApiBearerAuth()
@Controller('company')
@UseGuards(JwtAuthGuard, PermissionGuard, RolesGuard)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @ReadPermission()
  create(
    @Body() createCompanyDto: CreateCompanyDto
  ): Promise<CompanyResponseDto> {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @ReadPermission()
  findAll(): Promise<CompanyResponseDto[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @ModifyPermission()
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<CompanyResponseDto> {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @ModifyPermission()
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
