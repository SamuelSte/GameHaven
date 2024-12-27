import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStatDto } from "./dto/createStat.dto";
import { UpdateStatDto } from "./dto/updateStat.dto";
import { User } from "src/tables/users/users.entity";
import { Game } from "src/tables/games/games.entity";
import { Stat } from "./stats.entity";

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Stat)
        private readonly statRepository: Repository<Stat>,
    ) {}
    
    async create(createStatDto: CreateStatDto) {
        const user = await this.statRepository.manager.getRepository(User).findOne({ where: { id: createStatDto.userId } });
        const game = await this.statRepository.manager.getRepository(Game).findOne({ where: { id: createStatDto.gameId } });
      
        if (!user || !game) {
          throw new Error('User or Game not found');
        }
      
        const stat = this.statRepository.create({
          ...createStatDto,
          user,
          game,
        });
      
        return this.statRepository.save(stat);
      }
      

    findAll() {
        return this.statRepository.find({ relations: ['user', 'game'] });
    }

    findOne(id: number) {
        return this.statRepository.findOne({ where: { id }, relations: ['user', 'game'] });
    }

    update(id: number, updateStatDto: UpdateStatDto) {
        return this.statRepository.update(id, updateStatDto);
    }

    remove(id: number) {
        return this.statRepository.delete(id);
    }
}