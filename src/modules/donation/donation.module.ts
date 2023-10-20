import { Module } from '@nestjs/common';
import { DonationService } from './donation.service';
import { DonationController } from './donation.controller';
import { DonationCampaignRepository } from '../donation-campaign/repositories';
import { DonationRepository } from './repositories';

@Module({
  controllers: [DonationController],
  providers: [DonationService, DonationRepository, DonationCampaignRepository],
})
export class DonationModule {}
