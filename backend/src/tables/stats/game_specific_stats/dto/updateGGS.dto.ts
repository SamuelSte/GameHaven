import { IsNotEmpty } from "class-validator";


export class UpdateGameSpecificStatDto {

    @IsNotEmpty()
    data: Record<string, any>;

}

