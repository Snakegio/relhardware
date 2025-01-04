import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CompanyResponseDto } from './dto/company-response.dto';
import { Roles } from 'nest-keycloak-connect';

@ApiBearerAuth()
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  @Roles({ roles: ['READ'] })
  create(
    @Body() createCompanyDto: CreateCompanyDto
  ): Promise<CompanyResponseDto> {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  @Roles({ roles: ['READ'] })
  findAll(): Promise<CompanyResponseDto[]> {
    return this.companyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<CompanyResponseDto> {
    return this.companyService.findOne(+id);
  }

  @Patch(':id')
  @Roles({ roles: ['MODIFY'] })
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto
  ): Promise<CompanyResponseDto> {
    return this.companyService.update(+id, updateCompanyDto);
  }

  @Delete(':id')
  @Roles({ roles: ['MODIFY'] })
  remove(@Param('id') id: string) {
    return this.companyService.remove(+id);
  }
}
