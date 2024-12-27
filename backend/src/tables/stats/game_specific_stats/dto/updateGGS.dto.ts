import { CreateGameSpecificStatDto } from "./createGGS.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGameSpecificStatDto extends PartialType(CreateGameSpecificStatDto) {}

