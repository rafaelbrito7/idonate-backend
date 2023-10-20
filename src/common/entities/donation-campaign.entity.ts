import { DonationCampaign } from '@prisma/client';

export class DonationCampaignEntity implements DonationCampaign {
  id: string;
  title: string;
  description: string;
  goal: number;
  moneyRaised: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  campaignOrganizerId: string;
}
