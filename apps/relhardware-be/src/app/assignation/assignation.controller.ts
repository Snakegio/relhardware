import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AssignationService } from './assignation.service';
import { CreateAssignationDto } from './dto/create-assignation.dto';
import { UpdateAssignationDto } from './dto/update-assignation.dto';

@Controller('assignation')
export class AssignationController {
  constructor(private readonly assignationService: AssignationService) {}

  @Post()
  create(@Body() createAssignationDto: CreateAssignationDto) {
    return this.assignationService.create(createAssignationDto);
  }

  @Get()
  findAll() {
    return this.assignationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assignationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAssignationDto: UpdateAssignationDto
  ) {
    return this.assignationService.update(+id, updateAssignationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assignationService.remove(+id);
  }
}
