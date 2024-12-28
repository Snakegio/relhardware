import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';

//todo remember to send emitter for create historical element
@Injectable()
export class RolesService {
  private readonly logger = new Logger(RolesService.name, { timestamp: true });

  constructor(
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  create(createRoleDto: CreateRoleDto): Promise<Roles> {
    const role = this.rolesRepository.create(createRoleDto);
    this.logger.debug('[RolesService] create role', role);
    return this.rolesRepository.save(role);
  }

  findAll(): Promise<Roles[]> {
    return this.rolesRepository.find();
  }

  async findOne(id: number): Promise<Roles> {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
    this.logger.debug('[RolesService] findOne role', role);
    return role;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Roles> {
    const role = await this.rolesRepository.findOneBy({ id });
    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    Object.assign(role, updateRoleDto);
    this.logger.debug('[RolesService] update role', role);
    return this.rolesRepository.save(role);
  }

  async remove(id: number): Promise<void> {
    this.logger.debug('[RolesService] remove role', id);
    const result = await this.rolesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }
  }
}
