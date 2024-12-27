import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
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
  
    @Get()
    findAll() {
      return this.gameSpecificStatService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.gameSpecificStatService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateGameSpecificStatDto: UpdateGameSpecificStatDto) {
      return this.gameSpecificStatService.update(id, updateGameSpecificStatDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.gameSpecificStatService.remove(id);
    }
}