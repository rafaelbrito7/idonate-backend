import { Test, TestingModule } from '@nestjs/testing';
import { DonationCampaignController } from './donation-campaign.controller';
import { DonationCampaignService } from './donation-campaign.service';

describe('DonationCampaignController', () => {
  let controller: DonationCampaignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationCampaignController],
      providers: [DonationCampaignService],
    }).compile();

    controller = module.get<DonationCampaignController>(
      DonationCampaignController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
