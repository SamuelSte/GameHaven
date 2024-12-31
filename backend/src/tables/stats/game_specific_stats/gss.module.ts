import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameSpecificStat } from "./gss.entity";
import { GSSController } from "./gss.controller";
import { GSSService } from "./gss.service";
import { StatsModule } from "../stats.module";

@Module({
    imports: [TypeOrmModule.forFeature([GameSpecificStat]), StatsModule],
    controllers: [GSSController],
    providers: [GSSService]
})
export class GSSModule {

}