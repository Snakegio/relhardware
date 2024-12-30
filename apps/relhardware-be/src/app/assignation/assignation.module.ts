import { Module } from '@nestjs/common';
import { AssignationService } from './assignation.service';
import { AssignationController } from './assignation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Assignation } from './entities/assignation.entity';
import { Item } from '../item/entities/item.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignation, User, Item])],
  controllers: [AssignationController],
  providers: [AssignationService],
})
export class AssignationModule {}
