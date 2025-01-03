import { IsNotEmpty } from "class-validator";


export class UpdateSaveDto {

    @IsNotEmpty()
    data: Record<string, any>;

}

