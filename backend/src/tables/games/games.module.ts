import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Game } from "./games.entity";
import { GameController } from "./games.controller";
import { GameService } from "./games.service";


@Module({
    imports: [TypeOrmModule.forFeature([Game])],
    controllers: [GameController],
    providers: [GameService],
    exports: [GameService]
})
export class GameModule {

}