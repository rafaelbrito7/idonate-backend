import { IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
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
    description: 'The user cnpj',
    type: String,
    example: '00.000.000/0000-00',
  })
  @IsOptional()
  @IsString()
  public cnpj?: string;

  @ApiProperty({
    description: 'The user password',
    type: String,
    example: '123456',
  })
  @IsNotEmpty()
  @Min(6)
  @IsString()
  public password: string;
}
