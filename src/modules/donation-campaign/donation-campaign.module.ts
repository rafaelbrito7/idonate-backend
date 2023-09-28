import { Module } from '@nestjs/common';
import { DonationCampaignService } from './donation-campaign.service';
import { DonationCampaignController } from './donation-campaign.controller';
import { DonationCampaignRepository } from './repositories';
import { PrismaService } from 'src/config';

@Module({
  controllers: [DonationCampaignController],
  providers: [
    DonationCampaignService,
    DonationCampaignRepository,
    PrismaService,
  ],
})
export class DonationCampaignModule {}
