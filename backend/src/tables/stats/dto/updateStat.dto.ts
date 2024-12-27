import { PartialType } from '@nestjs/mapped-types';
import { CreateStatDto } from './createStat.dto';

export class UpdateStatDto extends PartialType(CreateStatDto) {}