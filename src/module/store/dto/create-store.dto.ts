import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  description: string;
}
