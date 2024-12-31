import { IsNotEmpty, IsNumber } from "class-validator";

export class updateStatDto {
    
    @IsNotEmpty()
    @IsNumber()
    gamesPlayed: number;

    @IsNotEmpty()
    @IsNumber()
    gamesWon: number;
}