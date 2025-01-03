import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateStatDto } from "./dto/createStat.dto";
import { User } from "src/tables/users/users.entity";
import { Game } from "src/tables/games/games.entity";
import { Stat } from "./stats.entity";
import { GameService } from "../games/games.service";
import { updateStatDto } from "./dto/updateStat.dto";
import { UserService } from "../users/users.service";

@Injectable()
export class StatsService {
    constructor(
        @InjectRepository(Stat) private readonly statRepository: Repository<Stat>,
        private readonly gameService: GameService,
        private readonly userService: UserService
    ) {}
    
    async create(createStatDto: CreateStatDto) {
        const user = await this.statRepository.manager.getRepository(User).findOne({ where: { id: createStatDto.userId } });
        const game = await this.statRepository.manager.getRepository(Game).findOne({ where: { id: createStatDto.gameId } });
      
        if (!user || !game) {
          throw new Error('User or Game not found');
        }

        
        const stat = await this.findOneByGameAndDifficulty(createStatDto.userId, createStatDto.gameId, createStatDto.difficulty);

        if (stat) {
            throw new ConflictException('Stat already exists.');
        }
        

        if (!createStatDto.lastPlayed) {
            createStatDto.lastPlayed = new Date();
        }
      
        const newStat = this.statRepository.create({
            ...createStatDto,
            user,
            game
    });
        return this.statRepository.save(newStat);
        
      }

    async findOneByGameAndDifficulty(userId: number, gameId: number, difficulty: string) {
        const game = await this.gameService.findOneById(gameId);
        const user = await this.userService.findOneById(userId);

        if (!game || !user) {
            throw new ConflictException('Game or User not found');
        }

        return this.statRepository.findOne({
            where: { user: user, game: game, difficulty: difficulty },
            relations: ['user', 'game'],
        });
    }

    async update(userId: number, gameId: number, difficulty: string, updateStatDto: updateStatDto) {
        const stat = await this.findOneByGameAndDifficulty(userId, gameId, difficulty);

        if (!stat) {
            throw new Error('Stat not found');
        }

        return this.statRepository.update({id: stat.id}, {...updateStatDto});
    }

    findOneById(id: number) {
        return this.statRepository.findOneBy({id});
    }

    remove(id: number) {
        return this.statRepository.delete(id);
    }
}