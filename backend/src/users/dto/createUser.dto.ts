import { IsDateString, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    username: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    password: string;


    @IsOptional()
    @IsDateString()
    createdAt?: Date;
}