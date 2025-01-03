import { IsNotEmpty, IsString } from "class-validator";

export class CreateGameDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;
    

    @IsString()
    @IsNotEmpty()
    category: string;
}