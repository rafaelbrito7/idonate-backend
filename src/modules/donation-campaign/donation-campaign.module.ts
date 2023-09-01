import { Module } from '@nestjs/common';
import { DonationCampaignService } from './donation-campaign.service';
import { DonationCampaignController } from './donation-campaign.controller';
import { DonationCampaignRepository } from './repositories/donation-campaign.repository';
import { PrismaService } from 'src/config/prisma';

@Module({
  controllers: [DonationCampaignController],
  providers: [
    DonationCampaignService,
    DonationCampaignRepository,
    PrismaService,
  ],
})
export class DonationCampaignModule {}
