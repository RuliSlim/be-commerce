import { AdminRole } from '@common/shared/constant/admin.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsOptional()
  @IsArray()
  storesIds: string[] | undefined;

  @ApiProperty({
    required: true,
    description: 'The input must be follow email format',
    example: 'email@mail.com',
  })
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    description:
      'The password min length 8 and must have a Uppercase, lowercase letter and a number',
    example: 'Satu1Dua2',
  })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password min length 8 and must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @ApiProperty({
    required: true,
    description: 'Name for the admin',
    example: 'Joko',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    description: 'Role access admin',
    enum: AdminRole,
    // isArray: false,
    // example: [AdminRole.SUPER_ADMIN, AdminRole.ADMIN],
  })
  @IsEnum(AdminRole)
  role: AdminRole;
}
