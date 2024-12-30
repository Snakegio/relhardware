import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemTypeService } from './item-type.service';
import { CreateItemTypeDto } from './dto/create-item-type.dto';
import { UpdateItemTypeDto } from './dto/update-item-type.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly itemTypeService: ItemTypeService) {}

  @Post()
  create(@Body() createItemTypeDto: CreateItemTypeDto) {
    return this.itemTypeService.create(createItemTypeDto);
  }

  @Get()
  findAll() {
    return this.itemTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemTypeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItemTypeDto: UpdateItemTypeDto
  ) {
    return this.itemTypeService.update(+id, updateItemTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemTypeService.remove(+id);
  }
}
