import { Module } from '@nestjs/common';
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
import { PdfModule } from './pdf/pdf.module';
import { Assignation } from './assignation/entities/assignation.entity';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { KeycloakConfigService } from './keycloak-config/keycloak-config.service';
import { KeycloakConfigModule } from './keycloak-config/keycloak-config.module';
import { APP_GUARD } from '@nestjs/core';

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
      entities: [User, Roles, Company, ItemType, Item, Assignation],
      synchronize: false,
    }),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
    CompanyModule,
    ItemTypeModule,
    ItemModule,
    AssignationModule,
    PdfModule,
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [KeycloakConfigModule],
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
