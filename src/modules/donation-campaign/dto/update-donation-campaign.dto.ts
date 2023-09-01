import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateDonationCampaignDto } from './create-donation-campaign.dto';
import { IsNotEmpty, IsString, Min, Max, IsNumber } from 'class-validator';

export class UpdateDonationCampaignDto extends PartialType(
  CreateDonationCampaignDto,
) {
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
}
