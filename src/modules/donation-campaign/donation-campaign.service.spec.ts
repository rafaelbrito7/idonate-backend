import { Test, TestingModule } from '@nestjs/testing';
import { DonationCampaignService } from './donation-campaign.service';

describe('DonationCampaignService', () => {
  let service: DonationCampaignService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DonationCampaignService],
    }).compile();

    service = module.get<DonationCampaignService>(DonationCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
