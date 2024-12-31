import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsIn } from 'class-validator';

export class CreateStatDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsNumber()
  gameId: number;

  @IsOptional()
  @IsNumber()
  gamesPlayed: number = 0;

  @IsOptional()
  @IsNumber()
  gamesWon: number = 0;

  @IsNotEmpty()
  @IsIn(['easy', 'medium', 'hard'])
  difficulty: string;

  @IsOptional()
  @IsDateString()
  lastPlayed?: Date;
}
