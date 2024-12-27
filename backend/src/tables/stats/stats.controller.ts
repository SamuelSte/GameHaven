import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { CreateStatDto } from "./dto/createStat.dto";
import { UpdateStatDto } from "./dto/updateStat.dto";

@Controller('stats')
export class StatsController {
    constructor(private readonly statService: StatsService) {}

    @Post(':userId/:gameId')
    create(
      @Param('userId') userId: number,
      @Param('gameId') gameId: number,
      @Body() createStatDto: CreateStatDto,
    ) {
      createStatDto.userId = userId;
      createStatDto.gameId = gameId;
      return this.statService.create(createStatDto);
    }
  
    @Get()
    findAll() {
      return this.statService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: number) {
      return this.statService.findOne(id);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() updateStatDto: UpdateStatDto) {
      return this.statService.update(id, updateStatDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.statService.remove(id);
    }
}