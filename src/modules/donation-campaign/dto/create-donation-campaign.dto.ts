import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateDonationCampaignDto {
  @ApiProperty({
    description: 'The donation campaign title',
    type: String,
    example: 'Campanha abrigo XPTO',
  })
  @IsNotEmpty()
  @IsString()
  public title: string;

  @ApiProperty({
    description: 'The donation campaign description',
    type: String,
    example: 'Arrecadação de dinheiro para compra de alimento para animais',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  @MinLength(10)
  public description: string;

  @ApiProperty({
    description: 'The donation campaign goal',
    type: Number,
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  public goal: number;
}
