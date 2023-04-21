import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateStoreDto {
  @IsNotEmpty()
  @MinLength(5)
  @ApiProperty({
    required: true,
    description: 'Name of the store, at least 5 length',
    default: 'Online Shop',
  })
  name: string;

  @ApiProperty({
    required: false,
    description: 'Description of the store',
    default: undefined,
  })
  description: string;
}
