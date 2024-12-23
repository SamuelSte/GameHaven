import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username?: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password?: string;
}