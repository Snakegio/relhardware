import { Module } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from './item-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemType } from './entities/item-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemType])],
  controllers: [ItemTypeController],
  providers: [ItemTypeService],
})
export class ItemTypeModule {}
