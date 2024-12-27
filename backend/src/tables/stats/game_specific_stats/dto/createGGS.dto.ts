import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGameSpecificStatDto {
  @IsNotEmpty()
  @IsNumber()
  statId: number;

  @IsNotEmpty()
  data: Record<string, any>;
}