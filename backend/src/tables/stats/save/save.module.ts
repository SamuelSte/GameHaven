import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SaveController } from "./save.controller";
import { SaveService } from "./save.service";
import { StatsModule } from "../stats.module";
import { Save } from "./save.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Save]), StatsModule],
    controllers: [SaveController],
    providers: [SaveService]
})
export class SaveModule {

}