import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
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
  @IsOptional()
  @IsString()
  public cpf?: string;

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
