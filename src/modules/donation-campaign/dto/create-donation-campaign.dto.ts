import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
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
  @Min(10)
  @Max(500)
  public description: string;

  @ApiProperty({
    description: 'The donation campaign goal',
    type: Number,
    example: 10000,
  })
  @IsNotEmpty()
  @IsNumber()
  public goal: number;

  @ApiProperty({
    description: 'The donation campaign organizer id',
    type: String,
    example: 'uuidv4()',
  })
  @IsNotEmpty()
  @IsUUID()
  public campaignOrganizerId: string;
}
