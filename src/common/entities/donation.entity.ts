import { Donation, DonationCampaign } from '@prisma/client';
import { DonationCampaignEntity } from './donation-campaign.entity';

export class DonationEntity implements Donation {
  id: string;
  moneyAmount: number;
  createdAt: Date;
  updatedAt: Date;
  donationCampaignId: string;
  donationCampaign?: DonationCampaignEntity;
  donorId: string;
}
