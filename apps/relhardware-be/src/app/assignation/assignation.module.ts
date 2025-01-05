import { Module } from '@nestjs/common';
import { AssignationService } from './assignation.service';
import { AssignationController } from './assignation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignation } from './entities/assignation.entity';
import { Item } from '../item/entities/item.entity';
import { UserService } from '../users/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Assignation, Item])],
  controllers: [AssignationController],
  providers: [AssignationService,UserService],
})
export class AssignationModule {}
