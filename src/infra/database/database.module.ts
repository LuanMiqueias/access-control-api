import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/domain/permissions/enterprise/permission.entity';
import { Role } from 'src/domain/roles/enterprise/role.entity';
import { User } from 'src/domain/users/enterprise/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): any => {
        const dbHost = configService.get<string>('DB_HOST');
        const dbPort = configService.get<number>('DB_PORT');
        const dbUser = configService.get<string>('DB_USER');
        const dbPass = configService.get<string>('DB_PASS');
        const dbName = configService.get<string>('DB_NAME');

        console.log('DB_HOST:', dbHost);
        console.log('DB_PORT:', dbPort);
        console.log('DB_USER:', dbUser);
        console.log('DB_PASS:', dbPass);
        console.log('DB_NAME:', dbName);

        return {
          type: 'postgres',
          host: dbHost ?? 'localhost',
          port: dbPort ?? 5432,
          username: dbUser ?? 'postgres',
          password: dbPass ?? 'postgres',
          database: dbName ?? 'access_control',
          autoLoadEntities: true,
          entities: [User, Role, Permission],
          synchronize: true,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
