import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './tables/users/users.entity';
import { UserModule } from './tables/users/users.module';
import { Game } from './tables/games/games.entity';
import { GameModule } from './tables/games/games.module';
import { Save } from './tables/stats/save/save.entity';
import { Stat } from './tables/stats/stats.entity';
import { StatsModule } from './tables/stats/stats.module';
import { SaveModule } from './tables/stats/save/save.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Game, Save, Stat],
        synchronize: false
      }),
      inject: [ConfigService],
    }),
    UserModule,
    GameModule,
    StatsModule,
    SaveModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
