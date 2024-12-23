import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/users.entity';
import { UserModule } from './users/users.module';
import { Game } from './games/games.entity';
import { GameModule } from './games/games.module';
import { GameSpecificStat } from './stats/game_specific_stats/gss.entity';
import { Stat } from './stats/stats.entity';
import { StatsModule } from './stats/stats.module';
import { GSSModule } from './stats/game_specific_stats/gss.module';

@Module({
  imports: [ 
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3307,
      username: 'root',
      password: '1234',
      database: 'GameHaven',
      entities: [User, Game, GameSpecificStat, Stat],
      synchronize: true,
      dropSchema: true
    }),
    UserModule, GameModule, StatsModule, GSSModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
