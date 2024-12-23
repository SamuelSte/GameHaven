import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stat } from "./stats.entity";
import { StatsController } from "./stats.controller";
import { StatsService } from "./stats.service";

@Module({
    imports: [TypeOrmModule.forFeature([Stat])],
    controllers: [StatsController],
    providers: [StatsService]
})
export class StatsModule {
    
}