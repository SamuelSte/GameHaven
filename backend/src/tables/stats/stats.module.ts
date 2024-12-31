import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stat } from "./stats.entity";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";
import { GameModule } from "../games/games.module";
import { UserModule } from "../users/users.module";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Stat]), GameModule, UserModule],
    controllers: [StatsController],
    providers: [StatsService, JwtService],
    exports: [StatsService]
})
export class StatsModule {
    
}