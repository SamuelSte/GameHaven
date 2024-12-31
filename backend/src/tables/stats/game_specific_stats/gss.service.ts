import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameSpecificStat } from "./gss.entity";
import { Repository } from "typeorm";
import { CreateGameSpecificStatDto } from "./dto/createGGS.dto";
import { UpdateGameSpecificStatDto } from "./dto/updateGGS.dto";
import { StatsService } from "../stats.service";
import { Stat } from "../stats.entity";

@Injectable()
export class GSSService {

    constructor(
        @InjectRepository(GameSpecificStat) private readonly gameSpecificStatRepository: Repository<GameSpecificStat>,
        private statsService: StatsService
    ) {}
    
    async create(createGameSpecificStatDto: CreateGameSpecificStatDto) {
        const stat = await this.statsService.findOneById(createGameSpecificStatDto.statId);

        if (!stat) {
            throw new Error("Stat not found");
        }
        const gameSpecificStat = this.gameSpecificStatRepository.create(createGameSpecificStatDto);
        return this.gameSpecificStatRepository.save(gameSpecificStat);
    }

    findAll() {
        return this.gameSpecificStatRepository.find({ relations: ['stat'] });
    }

    findOneById(id: number) {
        return this.gameSpecificStatRepository.findOne({ where: { id }, relations: ['stat'] });
    }

    async findOneByStatId(statId: number) {
        const stat = await this.statsService.findOneById(statId);
        return this.findOneByStat(stat);
    }

    findOneByStat(stat: Stat) {
        return this.gameSpecificStatRepository.findOne({ where: { stat: stat }, relations: ['stat']})
    }

    update(id: number, updateGameSpecificStatDto: UpdateGameSpecificStatDto) {
        return this.gameSpecificStatRepository.update(id, updateGameSpecificStatDto);
    }

    remove(id: number) {
        return this.gameSpecificStatRepository.delete(id);
    }

}