import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateSaveDto } from "./dto/createSave.dto";
import { UpdateSaveDto } from "./dto/updateSave.dto";
import { SaveService } from "./save.service";

@Controller('saves')
export class SaveController {
    constructor(private readonly saveService: SaveService) {}

    @Post(':statId')
    create(
      @Param('statId') statId: number,
      @Body() createSaveDto: CreateSaveDto,
    ) {
      createSaveDto.statId = statId;
      return this.saveService.create(createSaveDto);
    }
  
    @Get(':statId')
    findOneById(@Param('statId') statId: number) {
      return this.saveService.findOneByStatId(statId);
    }
  
    @Patch(':statId')
    update(@Param('statId') statId: number, @Body() updateSaveDto: UpdateSaveDto) {
      return this.saveService.update(statId, updateSaveDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: number) {
      return this.saveService.remove(id);
    }
}