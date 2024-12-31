import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { GSSService } from "./gss.service";
import { CreateGameSpecificStatDto } from "./dto/createGGS.dto";
import { UpdateGameSpecificStatDto } from "./dto/updateGGS.dto";

@Controller('game_specific_stats')
export class GSSController {
    constructor(private readonly gameSpecificStatService: GSSService) {}

    @Post(':statId')
    create(
      @Param('statId') statId: number,
      @Body() createGameSpecificStatDto: CreateGameSpecificStatDto,
    ) {
      createGameSpecificStatDto.statId = statId;
      return this.gameSpecificStatService.create(createGameSpecificStatDto);
    }
  
    @Get(':statId')
    findOneById(@Param('statId') statId: number) {
      return this.gameSpecificStatService.findOneByStatId(statId);
    }
  
    @Patch(':id')
    update(@Param('id') id: number, @Body() updateGameSpecificStatDto: UpdateGameSpecificStatDto) {
      return this.gameSpecificStatService.update(id, updateGameSpecificStatDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.gameSpecificStatService.remove(id);
    }
}