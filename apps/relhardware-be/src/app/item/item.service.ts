import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { ItemType } from '../item-type/entities/item-type.entity';
import { Company } from '../company/entities/company.entity';
import { plainToInstance } from 'class-transformer';
import { ItemResponseDto } from './dto/item-response.dto';

@Injectable()
export class ItemService {
  private readonly logger = new Logger(ItemService.name, { timestamp: true });

  constructor(
    @InjectRepository(Item) private itemRepository: Repository<Item>,
    @InjectRepository(ItemType)
    private itemTypeRepository: Repository<ItemType>,
    @InjectRepository(Company) private companyRepository: Repository<Company>
  ) {}

  async create(createItemDto: CreateItemDto) {
    const { itemType, company, ...otherFields } = createItemDto;
    // Verifica dell'esistenza del tipo di elemento (itemType)
    const existingItemType = await this.itemTypeRepository.findOne({
      where: { id: itemType.id },
    });
    if (!existingItemType) {
      throw new NotFoundException(`ItemType with ID ${itemType} not found`);
    }

    // Verifica dell'esistenza della compagnia (idCompany)
    const existingCompany = await this.companyRepository.findOne({
      where: { id: company.id },
    });
    if (!existingCompany) {
      throw new NotFoundException(`Company with ID ${company.id} not found`);
    }

    // Creazione e salvataggio dell'elemento
    const newItem = this.itemRepository.create({
      ...otherFields,
      itemType: existingItemType,
      idCompany: existingCompany,
    });
    return plainToInstance(
      ItemResponseDto,
      await this.itemRepository.save(newItem)
    );
  }

  async findAll() {
    return plainToInstance(ItemResponseDto, await this.itemRepository.find());
  }

  async findOne(id: number) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    this.logger.debug('findOne item', item);
    return plainToInstance(ItemResponseDto, item);
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    const item = await this.itemRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    Object.assign(item, updateItemDto);
    // Verifica dell'esistenza del tipo di elemento (itemType)
    const existingItemType = await this.itemTypeRepository.findOne({
      where: { id: updateItemDto.itemType.id },
    });
    if (!existingItemType) {
      throw new NotFoundException(
        `ItemType with ID ${updateItemDto.itemType} not found`
      );
    }

    // Verifica dell'esistenza della compagnia (idCompany)
    const existingCompany = await this.companyRepository.findOne({
      where: { id: updateItemDto.company.id },
    });
    if (!existingCompany) {
      throw new NotFoundException(
        `Company with ID ${updateItemDto.company} not found`
      );
    }
    item.itemType = existingItemType;
    item.idCompany = existingCompany;
    this.logger.debug('update item', JSON.stringify(item));
    return plainToInstance(
      ItemResponseDto,
      await this.itemRepository.save(item)
    );
  }

  async remove(id: number) {
    this.logger.debug('remove item', id);
    const result = await this.itemRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
  }
}
