import { IsOptional } from "class-validator";

export class UpdateGameDto {

    @IsOptional()
    name?: string;

    @IsOptional()
    category?: string;

}