import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { GameService } from "./games.service";
import { CreateGameDto } from "./dto/createGame.dto";
import { UpdateGameDto } from "./dto/updateGame.dto";


@Controller('games')
export class GameController {

    constructor(private gameService: GameService) {
        
    }

    @Post()
    create(@Body() createGameDto: CreateGameDto) {
      return this.gameService.create(createGameDto);
    }
  
    @Get()
    findAll() {
      return this.gameService.findAll();
    }
    
    @Get(':name')
    findOneByName(@Param('name') name: string) {
      return this.gameService.findOneByName(name);
    }
  
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateGameDto: UpdateGameDto) {
      return this.gameService.updateGame(id, updateGameDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.gameService.remove(id);
    }

}