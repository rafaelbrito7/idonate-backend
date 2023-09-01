import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The user email',
    type: String,
    example: 'user@email.com',
  })
  @IsNotEmpty()
  @IsString()
  public email: string;

  @ApiProperty({
    description: 'The user name',
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  public firstName: string;

  @ApiProperty({
    description: 'The user last name',
    type: String,
    example: 'Doe',
  })
  @IsNotEmpty()
  @IsString()
  public lastName: string;

  @ApiProperty({
    description: 'The user birthday',
    type: Date,
    example: '1990-01-01',
  })
  @IsNotEmpty()
  @IsString()
  public birthday: Date;

  @ApiProperty({
    description: 'The user cpf',
    type: String,
    example: '000.000.000-00',
  })
  @IsNotEmpty()
  @IsString()
  public cpf: string;

  @ApiProperty({
    description: 'The user cnpj',
    type: String,
    example: '00.000.000/0000-00',
  })
  @IsNotEmpty()
  @IsString()
  public cnpj: string;
}
