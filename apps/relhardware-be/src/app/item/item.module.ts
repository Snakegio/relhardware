import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Company } from '../company/entities/company.entity';
import { ItemType } from '../item-type/entities/item-type.entity';
import { Assignation } from '../assignation/entities/assignation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Company, ItemType, Assignation])],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
