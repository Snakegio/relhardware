import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { Company } from './company/entities/company.entity';
import { ItemTypeModule } from './item-type/item-type.module';
import { ItemType } from './item-type/entities/item-type.entity';
import { ItemModule } from './item/item.module';
import { Item } from './item/entities/item.entity';
import { AssignationModule } from './assignation/assignation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'relhardware',
      database: 'postgres',
      schema: 'relhardware',
      entities: [User, Roles, Company, ItemType, Item],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    CompanyModule,
    ItemTypeModule,
    ItemModule,
    AssignationModule,
  ],
})
export class AppModule {}

//todo giorgio indagare per generazione pdf nestjs-html-pdf
