import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StatsService } from "../stats.service";
import { Stat } from "../stats.entity";
import { CreateSaveDto } from "./dto/createSave.dto";
import { UpdateSaveDto } from "./dto/updateSave.dto";
import { Save } from "./save.entity";

@Injectable()
export class SaveService {

    constructor(
        @InjectRepository(Save) private readonly saveRepository: Repository<Save>,
        private statsService: StatsService
    ) {}
    
    async create(createSaveDto: CreateSaveDto) {
        const stat = await this.statsService.findOneById(createSaveDto.statId);

        if (!stat) {
            throw new Error("Stat not found");
        }
        const gameSpecificStat = this.saveRepository.create({
            ...createSaveDto,
            stat
    });
        return this.saveRepository.save(gameSpecificStat);
    }

    findAll() {
        return this.saveRepository.find({ relations: ['stat'] });
    }

    findOneById(id: number) {
        return this.saveRepository.findOne({ where: { id }, relations: ['stat'] });
    }

    async findOneByStatId(statId: number) {
        const stat = await this.statsService.findOneById(statId);
        return this.findOneByStat(stat);
    }

    findOneByStat(stat: Stat) {
        return this.saveRepository.findOne({ where: { stat: stat }, relations: ['stat']})
    }

    async update(statId: number, updateSaveDto: UpdateSaveDto) {
        const stat = await this.statsService.findOneById(statId);
        if (!stat) {
            throw new Error(`Stat with ID ${statId} not found.`);
        }

        const save = await this.findOneByStat(stat);
        if (!save) {
            throw new Error(`Save entry for Stat ID ${statId} not found.`);
        }
    
        try {
            await this.saveRepository.update(save.id, updateSaveDto);
            return this.saveRepository.findOne({ where: { id: save.id } });
        } catch (error) {
            console.error('Error updating save entry:', error);
            throw new Error('Failed to update save entry.');
        }
    }
    

    remove(id: number) {
        return this.saveRepository.delete(id);
    }

}