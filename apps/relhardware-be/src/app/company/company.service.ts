import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    const company = this.companyRepository.create(createCompanyDto);
    this.logger.debug('create company', JSON.stringify(company));
    return this.companyRepository.save(company);
  }

  findAll() {
    return this.companyRepository.find();
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    this.logger.debug('findOne company', company);
    return company;
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }

    Object.assign(company, updateCompanyDto);
    this.logger.debug('update company', JSON.stringify(company));
    return this.companyRepository.save(company);
  }

  async remove(id: number) {
    this.logger.debug('remove company', id);
    const result = await this.companyRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
  }
}
