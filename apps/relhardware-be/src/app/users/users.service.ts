import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dto/user-response.dto';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name, { timestamp: true });

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const roles = await this.rolesRepository.findBy({
      id: In(createUserDto.roles),
    });
    const user = this.usersRepository.create({
      ...createUserDto,
      roles: roles,
    });
    this.logger.debug('create user', JSON.stringify(user));
    return plainToInstance(
      UserResponseDto,
      await this.usersRepository.save(user)
    );
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.usersRepository.find();
    return plainToInstance(UserResponseDto, users);
  }

  async findOne(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.logger.debug('findOne user', user);
    return plainToInstance(UserResponseDto, user);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto
  ): Promise<UserResponseDto> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    Object.assign(user, updateUserDto);
    user.roles = await this.rolesRepository.findBy({
      id: In(updateUserDto.roles),
    });
    this.logger.debug('update user', user);
    return plainToInstance(
      UserResponseDto,
      await this.usersRepository.save(user)
    );
  }

  async remove(id: number): Promise<void> {
    this.logger.debug('remove user', id);
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({ email });
  }

  async findOneWithRoles(userId: number): Promise<User> {
    return this.usersRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
  }
}
