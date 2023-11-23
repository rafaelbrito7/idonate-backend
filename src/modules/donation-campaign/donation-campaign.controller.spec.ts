import { Test, TestingModule } from '@nestjs/testing';
import { DonationCampaignController } from './donation-campaign.controller';
import { DonationCampaignService } from './donation-campaign.service';

describe('DonationCampaignController', () => {
  let controller: DonationCampaignController;

  const mockCurrentUserId = 'currentUserId';
  const mockCampaignId = 'campaignId';

  const mockDonationCampaign = {
    id: mockCampaignId,
    title: 'Campaign title',
    description: 'Campaign description',
    goal: 1000,
    moneyRaised: 0,
    status: 'ACTIVE',
    createdAt: new Date('2023-11-22'),
    updatedAt: new Date('2023-11-22'),
    deletedAt: null,
    campaignOrganizerId: mockCurrentUserId,
  };

  const mockDonationCampaignService = {
    create: jest.fn((createDonationCampaignDto, currentUserId) => ({
      message: 'Campanha de doação criada com sucesso!',
      statusCode: 201,
      payload: {
        id: 'campaignId',
        ...mockDonationCampaign,
        ...createDonationCampaignDto,
        campaignOrganizerId: currentUserId,
      },
    })),
    findAll: jest.fn(() => ({
      message: 'Campanhas de doação encontradas com sucesso!',
      statusCode: 200,
      payload: [mockDonationCampaign],
    })),
    findById: jest.fn((id) => ({
      message: 'Campanha de doação encontrada com sucesso!',
      statusCode: 200,
      payload: {
        id,
        ...mockDonationCampaign,
      },
    })),
    update: jest.fn((id, updateDonationCampaignDto, campaignOrganizerId) => ({
      message: 'Campanha de doação atualizada com sucesso!',
      statusCode: 200,
      payload: {
        id,
        ...mockDonationCampaign,
        ...updateDonationCampaignDto,
        campaignOrganizerId,
      },
    })),
    endDonationCampaign: jest.fn((id, currentUserId) => ({
      message: 'Campanha de doação atualizada com sucesso!',
      statusCode: 200,
      payload: {
        id,
        ...mockDonationCampaign,
        status: 'ENDED',
        campaignOrganizerId: currentUserId,
      },
    })),
    delete: jest.fn((id, campaignOrganizerId) => ({
      message: 'Campanha de doação excluída com sucesso!',
      statusCode: 200,
      payload: null,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DonationCampaignController],
      providers: [DonationCampaignService],
    })
      .overrideProvider(DonationCampaignService)
      .useValue(mockDonationCampaignService)
      .compile();

    controller = module.get<DonationCampaignController>(
      DonationCampaignController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a donation campaign', async () => {
    const mockCreateDto = {
      title: 'Campaign title',
      description: 'Campaign description',
      goal: 1000,
    };

    const donationCampaign = await controller.create(
      mockCreateDto,
      mockCurrentUserId,
    );

    expect(donationCampaign).toEqual({
      message: 'Campanha de doação criada com sucesso!',
      statusCode: 201,
      payload: mockDonationCampaign,
    });

    expect(mockDonationCampaignService.create).toHaveBeenCalledWith(
      mockCreateDto,
      'currentUserId',
    );
  });

  it('should find all donation campaigns', async () => {
    expect(await controller.findAll()).toEqual({
      message: 'Campanhas de doação encontradas com sucesso!',
      statusCode: 200,
      payload: [mockDonationCampaign],
    });
  });

  it('should find a donation campaign by id', async () => {
    expect(await controller.findById('campaignId')).toEqual({
      message: 'Campanha de doação encontrada com sucesso!',
      statusCode: 200,
      payload: mockDonationCampaign,
    });

    expect(mockDonationCampaignService.findById).toHaveBeenCalledWith(
      'campaignId',
    );
  });

  it('should update a donation campaign', async () => {
    const mockUpdateDto = {
      title: 'Updated Campaign title',
      description: 'Updated Campaign description',
      goal: 1500,
    };

    expect(
      await controller.update('campaignId', mockUpdateDto, 'currentUserId'),
    ).toEqual({
      message: 'Campanha de doação atualizada com sucesso!',
      statusCode: 200,
      payload: {
        id: 'campaignId',
        ...mockDonationCampaign,
        ...mockUpdateDto,
        campaignOrganizerId: 'currentUserId',
      },
    });

    expect(mockDonationCampaignService.update).toHaveBeenCalledWith(
      'campaignId',
      mockUpdateDto,
      'currentUserId',
    );
  });

  it('should end a donation campaign', async () => {
    expect(
      await controller.endDonationCampaign('campaignId', 'currentUserId'),
    ).toEqual({
      message: 'Campanha de doação atualizada com sucesso!',
      statusCode: 200,
      payload: {
        id: 'campaignId',
        ...mockDonationCampaign,
        status: 'ENDED',
        campaignOrganizerId: 'currentUserId',
      },
    });

    expect(
      mockDonationCampaignService.endDonationCampaign,
    ).toHaveBeenCalledWith('campaignId', 'currentUserId');
  });

  it('should delete a donation campaign', async () => {
    expect(await controller.delete('campaignId', 'currentUserId')).toEqual({
      message: 'Campanha de doação excluída com sucesso!',
      statusCode: 200,
      payload: null,
    });

    expect(mockDonationCampaignService.delete).toHaveBeenCalledWith(
      'campaignId',
      'currentUserId',
    );
  });
});
