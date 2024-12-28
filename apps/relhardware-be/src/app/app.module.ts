import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Roles } from './roles/entities/roles.entity';
import { ConfigModule } from '@nestjs/config';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

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
      entities: [User, Roles],
      synchronize: false,
    }),
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RolesModule,
  ],
})
export class AppModule {}

//todo giorgio indagare per generazione pdf nestjs-html-pdf
