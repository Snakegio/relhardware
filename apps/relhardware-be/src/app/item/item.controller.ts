import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ItemResponseDto } from './dto/item-response.dto';

@ApiBearerAuth()
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() createItemDto: CreateItemDto): Promise<ItemResponseDto> {
    return this.itemService.create(createItemDto);
  }

  @Get()
  findAll(): Promise<ItemResponseDto[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ItemResponseDto> {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
