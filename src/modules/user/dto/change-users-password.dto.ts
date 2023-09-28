import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ChangeUsersPasswordDto {
  @ApiProperty({
    description: 'User password',
    type: String,
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 35)
  public oldPassword: string;

  @ApiProperty({
    description: 'User password',
    type: String,
    example: 'P@ssw0rd',
  })
  @IsNotEmpty()
  @IsString()
  @Length(8, 35)
  public newPassword: string;
}
