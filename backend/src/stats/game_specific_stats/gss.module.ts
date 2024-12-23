import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GameSpecificStat } from "./gss.entity";
import { GSSController } from "./gss.controller";
import { GSSService } from "./gss.service";

@Module({
    imports: [TypeOrmModule.forFeature([GameSpecificStat])],
    controllers: [GSSController],
    providers: [GSSService]
})
export class GSSModule {

}