import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'User email',
    type: String,
    required: false,
    example: 'testemail@email.com',
  })
  @IsEmail()
  @IsOptional()
  public email: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 35)
  public password: string;
}
