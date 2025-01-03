import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Game } from "./games.entity";
import { CreateGameDto } from "./dto/createGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";


@Injectable()
export class GameService {

    constructor(
        @InjectRepository(Game)
        private readonly gameRepository: Repository<Game>,
    ) {}
    
    create(createGameDto: CreateGameDto) {
        const game = this.gameRepository.create(createGameDto);
        return this.gameRepository.save(game);
    }

    findAll() {
        return this.gameRepository.find();
    }

    async findOneById(id: number): Promise<Game | null> {
        return await this.gameRepository.findOneBy({ id });
    }

    async findOneByName(name: string): Promise<Game | null> {
        return await this.gameRepository.findOneBy({ name });
    }

    updateGame(id: number, updateGameDto: UpdateGameDto) {
        return this.gameRepository.update(id, updateGameDto);
    }

    remove(id: number) {
        return this.gameRepository.delete(id);
    }

}