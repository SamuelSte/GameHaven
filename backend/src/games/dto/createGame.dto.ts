import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateGameDto {
    
    @IsNotEmpty()
    @IsString()
    name: string;
    

    @IsOptional()
    description?: string;
}