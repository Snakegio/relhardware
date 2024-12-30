import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemType } from './entities/item-type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemTypeService {
  private readonly logger = new Logger(ItemTypeService.name, {
    timestamp: true,
  });

  constructor(
    @InjectRepository(ItemType) private itemTypeRepository: Repository<ItemType>
  ) {}

  create(createItemTypeDto: CreateItemTypeDto) {
    const itemType = this.itemTypeRepository.create(createItemTypeDto);
    this.logger.debug('create itemType', JSON.stringify(itemType));
    return this.itemTypeRepository.save(itemType);
  }

  findAll() {
    return this.itemTypeRepository.find();
  }

  async findOne(id: number) {
    const itemType = await this.itemTypeRepository.findOneBy({ id });
    if (!itemType) {
      throw new NotFoundException(`ItemType with ID ${id} not found`);
    }
    this.logger.debug('findOne itemType', itemType);
    return itemType;
  }

  async update(id: number, updateItemTypeDto: UpdateItemTypeDto) {
    const itemType = await this.itemTypeRepository.findOneBy({ id });
    if (!itemType) {
      throw new NotFoundException(`itemType with ID ${id} not found`);
    }

    Object.assign(itemType, updateItemTypeDto);
    this.logger.debug('update itemType', JSON.stringify(itemType));
    return this.itemTypeRepository.save(itemType);
  }

  async remove(id: number) {
    this.logger.debug('remove itemType', id);
    const result = await this.itemTypeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`itemType with ID ${id} not found`);
    }
  }
}
