import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSaveDto {
  @IsNotEmpty()
  @IsNumber()
  statId: number;
 
  @IsNotEmpty()
  data: Record<string, any>;
}