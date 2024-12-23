import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateStatDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  gameId: number;

  @IsNotEmpty()
  @IsNumber()
  gamesPlayed: number;

  @IsNotEmpty()
  @IsNumber()
  gamesWon: number;

  @IsNotEmpty()
  difficulty: string;
}