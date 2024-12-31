import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from "@nestjs/common";
import { StatsService } from "./stats.service";
import { CreateStatDto } from "./dto/createStat.dto";
import { updateStatDto } from "./dto/updateStat.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller('stats')
@UseGuards(AuthGuard)
export class StatsController {
    constructor(private readonly statService: StatsService) {}

    @Post(':gameId')
    create(
      @Param('gameId') gameId: number,
      @Request() req: any,
      @Body() createStatDto: CreateStatDto,
    ) {
      createStatDto.userId = req.user.id;
      createStatDto.gameId = gameId;

      return this.statService.create(createStatDto);
    }
    

    @Get(':gameId/:difficulty')
    findOneByGameAndDifficulty(
      @Param() params: { gameId: number; difficulty: string },
      @Request() req: any
    ) {
      return this.statService.findOneByGameAndDifficulty(req.user.id, params.gameId, params.difficulty);
    }
    
    
    @Patch(':gameId/:difficulty')
    update(
      @Param() params: { gameId: number; difficulty: string },
      @Body() updateStatDto: updateStatDto,
      @Request() req: any
    ) {
      return this.statService.update(req.user.id, params.gameId, params.difficulty, updateStatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.statService.remove(id);
    }
}