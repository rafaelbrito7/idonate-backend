import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Min } from 'class-validator';

export class ChangeUsersPasswordDto {
  @ApiProperty({
    description: 'Users old password',
    type: String,
    example: '346P@ssword346',
  })
  @IsNotEmpty()
  @IsString()
  @Min(6)
  public oldPassword: string;

  @ApiProperty({
    description: 'The user name',
    type: String,
    example: '123P@ssword123',
  })
  @IsNotEmpty()
  @IsString()
  @Min(6)
  public newPassword: string;
}
