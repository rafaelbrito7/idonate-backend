import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class CreateDonationDto {
  @ApiProperty({
    description: 'The donation value',
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  public moneyAmount: number;

  @ApiProperty({
    description: 'The donation campaign id',
    type: String,
    example: 'f7b7f3a0-0b7e-4e1a-8b7a-5b5b7f3a0b7e',
  })
  @IsNotEmpty()
  @IsUUID()
  public donationCampaignId: string;
}
