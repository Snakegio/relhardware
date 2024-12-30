import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateAssignationDto } from './dto/create-assignation.dto';
import { UpdateAssignationDto } from './dto/update-assignation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Assignation } from './entities/assignation.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Item } from '../item/entities/item.entity';
import { AssignationResponseDto } from './dto/assignation-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AssignationService {
  private readonly logger = new Logger(AssignationService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(Assignation)
    private assignationRepository: Repository<Assignation>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Item) private itemRepository: Repository<Item>
  ) {}

  async create(
    createAssignationDto: CreateAssignationDto
  ): Promise<AssignationResponseDto> {
    const user = await this.userRepository.findOneBy({
      id: createAssignationDto.userId,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createAssignationDto.userId} not found`
      );
    }

    const item = await this.itemRepository.findOneBy({
      id: createAssignationDto.itemId,
    });
    if (!item) {
      throw new NotFoundException(
        `Item with ID ${createAssignationDto.itemId} not found`
      );
    }

    const assignation = this.assignationRepository.create({
      ...createAssignationDto,
      user,
      item,
    });

    this.logger.debug('create assignation', JSON.stringify(assignation));
    return plainToInstance(
      AssignationResponseDto,
      await this.assignationRepository.save(assignation)
    );
  }

  async findAll(): Promise<AssignationResponseDto[]> {
    const assignations = await this.assignationRepository.find();
    this.logger.debug('findAll assignations', JSON.stringify(assignations));
    return plainToInstance(AssignationResponseDto, assignations);
  }

  async findOne(id: number): Promise<AssignationResponseDto> {
    const assignation = await this.assignationRepository.findOne({
      where: { id },
    });
    if (!assignation) {
      throw new NotFoundException(`Assignation with ID ${id} not found`);
    }

    this.logger.debug('findOne assignation', JSON.stringify(assignation));
    return plainToInstance(AssignationResponseDto, assignation);
  }

  async update(
    id: number,
    updateAssignationDto: UpdateAssignationDto
  ): Promise<AssignationResponseDto> {
    const assignation = await this.assignationRepository.findOne({
      where: { id },
    });
    if (!assignation) {
      throw new NotFoundException(`Assignation with ID ${id} not found`);
    }

    if (updateAssignationDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateAssignationDto.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateAssignationDto.userId} not found`
        );
      }
      assignation.user = user;
    }

    if (updateAssignationDto.itemId) {
      const item = await this.itemRepository.findOneBy({
        id: updateAssignationDto.itemId,
      });
      if (!item) {
        throw new NotFoundException(
          `Item with ID ${updateAssignationDto.itemId} not found`
        );
      }
      assignation.item = item;
    }

    Object.assign(assignation, updateAssignationDto);
    this.logger.debug('update assignation', JSON.stringify(assignation));
    return plainToInstance(
      AssignationResponseDto,
      await this.assignationRepository.save(assignation)
    );
  }

  async remove(id: number): Promise<void> {
    this.logger.debug('remove assignation', id);
    const result = await this.assignationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Assignation with ID ${id} not found`);
    }
  }
}
