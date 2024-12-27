import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GameSpecificStat } from "./gss.entity";
import { Repository } from "typeorm";
import { CreateGameSpecificStatDto } from "./dto/createGGS.dto";
import { UpdateGameSpecificStatDto } from "./dto/updateGGS.dto";

@Injectable()
export class GSSService {

    constructor(
        @InjectRepository(GameSpecificStat)
        private readonly gameSpecificStatRepository: Repository<GameSpecificStat>,
    ) {}
    
    async create(createGameSpecificStatDto: CreateGameSpecificStatDto) {
        const gameSpecificStat = this.gameSpecificStatRepository.create(createGameSpecificStatDto);
        return this.gameSpecificStatRepository.save(gameSpecificStat);
    }

    findAll() {
        return this.gameSpecificStatRepository.find({ relations: ['stat'] });
    }

    findOne(id: number) {
        return this.gameSpecificStatRepository.findOne({ where: { id }, relations: ['stat'] });
    }

    update(id: number, updateGameSpecificStatDto: UpdateGameSpecificStatDto) {
        return this.gameSpecificStatRepository.update(id, updateGameSpecificStatDto);
    }

    remove(id: number) {
        return this.gameSpecificStatRepository.delete(id);
    }

}