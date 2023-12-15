import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    description: 'The comment content',
    type: String,
    example: 'Muito legal essa campanha!',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(255)
  public content: string;

  @ApiProperty({
    description: 'The donation campaign id',
    type: String,
    example: 'f7b7f3a0-0b7e-4e1a-8b7a-5b5b7f3a0b7e',
  })
  @IsNotEmpty()
  @IsUUID()
  public donationCampaignId: string;
}
