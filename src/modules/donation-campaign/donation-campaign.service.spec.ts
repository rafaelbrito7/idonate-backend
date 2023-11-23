import { Test, TestingModule } from '@nestjs/testing';
import { DonationCampaignService } from './donation-campaign.service';
import { DonationCampaignRepository } from './repositories';

describe('DonationCampaignService', () => {
  let service: DonationCampaignService;

  const mockCurrentUserId = 'currentUserId';
  const mockCampaignId = 'mockedCampaignId';

  const mockDonationCampaignRepository = {
    create: jest.fn((createDonationCampaignDto, currentUserId) => ({
      id: 'campaignId',
      ...createDonationCampaignDto,
      campaignOrganizerId: currentUserId,
    })),
    findAll: jest.fn(() => [
      {
        id: 'campaignOne',
        title: 'Campaign title',
        description: 'Campaign description',
        goal: 1000,
        moneyRaised: 0,
        status: 'ACTIVE',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        campaignOrganizerId: 'campaignOrganizerId',
      },
      {
        id: 'campaignTwo',
        title: 'Campaign title',
        description: 'Campaign description',
        goal: 1000,
        moneyRaised: 0,
        status: 'ACTIVE',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        campaignOrganizerId: 'campaignOrganizerId',
      },
    ]),

    findById: jest.fn((id) => {
      if (id === mockCampaignId) {
        return {
          id,
          title: 'Campaign title',
          description: 'Campaign description',
          goal: 1000,
          moneyRaised: 0,
          status: 'ACTIVE',
          createdAt: new Date('2023-11-22'),
          updatedAt: new Date('2023-11-22'),
          deletedAt: null,
          campaignOrganizerId: mockCurrentUserId,
          campaignOrganizer: {
            id: 'mockedCampaignOrganizerId',
            email: 'mockedCampaignOrganizerEmail',
            firstName: 'mockedCampaignOrganizerFirstName',
            lastName: 'mockedCampaignOrganizerLastName',
            birthday: new Date('2023-11-22'),
            cpf: 'mockedCampaignOrganizerCpf',
            cnpj: null,
            password: 'mockedCampaignOrganizerPassword',
            status: 'ACTIVE',
            createdAt: new Date('2023-11-22'),
            updatedAt: new Date('2023-11-22'),
            deletedAt: null,
          },
        };
      }
      return {
        id: 'campaignId',
        title: 'Campaign title',
        description: 'Campaign description',
        goal: 1000,
        moneyRaised: 0,
        status: 'ACTIVE',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        campaignOrganizerId: 'campaignOrganizerId',
        campaignOrganizer: {
          id: 'campaignOrganizerId',
          email: 'campaignOrganizerEmail',
          firstName: 'campaignOrganizerFirstName',
          lastName: 'campaignOrganizerLastName',
          birthday: new Date('2023-11-22'),
          cpf: 'campaignOrganizerCpf',
          cnpj: null,
          password: 'campaignOrganizerPassword',
          status: 'ACTIVE',
          createdAt: new Date('2023-11-22'),
          updatedAt: new Date('2023-11-22'),
          deletedAt: null,
        },
      };
    }),
    update: jest.fn((id, updateDonationCampaignDto) => ({
      id,
      moneyRaised: 0,
      status: 'ACTIVE',
      createdAt: new Date('2023-11-22'),
      updatedAt: new Date('2023-11-22'),
      deletedAt: null,
      campaignOrganizerId: mockCurrentUserId,
      ...updateDonationCampaignDto,
    })),
    endDonationCampaign: jest.fn((id) => ({
      id,
      title: 'Campaign title',
      description: 'Campaign description',
      goal: 1500,
      moneyRaised: 0,
      status: 'ENDED',
      createdAt: new Date('2023-11-22'),
      updatedAt: new Date('2023-11-22'),
      deletedAt: null,
      campaignOrganizerId: mockCurrentUserId,
    })),
    delete: jest.fn((id, currentUserId) => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DonationCampaignService,
        {
          provide: DonationCampaignRepository,
          useValue: mockDonationCampaignRepository,
        },
      ],
    }).compile();

    service = module.get<DonationCampaignService>(DonationCampaignService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a donation campaign', async () => {
    const mockCreateDto = {
      title: 'Campaign title',
      description: 'Campaign description',
      goal: 1000,
    };

    const donationCampaign = await service.create(
      mockCreateDto,
      mockCurrentUserId,
    );

    expect(donationCampaign).toEqual({
      message: 'Campanha de doação criada com sucesso!',
      statusCode: 201,
      payload: {
        id: 'campaignId',
        ...mockCreateDto,
        campaignOrganizerId: mockCurrentUserId,
      },
    });

    expect(mockDonationCampaignRepository.create).toHaveBeenCalledWith(
      mockCreateDto,
      mockCurrentUserId,
    );
  });

  it('should find all donation campaigns', async () => {
    const donationCampaigns = await service.findAll();

    expect(donationCampaigns).toEqual({
      message: 'Campanhas de doação encontradas com sucesso!',
      statusCode: 200,
      payload: [
        {
          id: 'campaignOne',
          title: 'Campaign title',
          description: 'Campaign description',
          goal: 1000,
          moneyRaised: 0,
          status: 'ACTIVE',
          createdAt: new Date('2023-11-22'),
          updatedAt: new Date('2023-11-22'),
          deletedAt: null,
          campaignOrganizerId: 'campaignOrganizerId',
        },
        {
          id: 'campaignTwo',
          title: 'Campaign title',
          description: 'Campaign description',
          goal: 1000,
          moneyRaised: 0,
          status: 'ACTIVE',
          createdAt: new Date('2023-11-22'),
          updatedAt: new Date('2023-11-22'),
          deletedAt: null,
          campaignOrganizerId: 'campaignOrganizerId',
        },
      ],
    }),
      expect(mockDonationCampaignRepository.findAll).toHaveBeenCalled();
  });

  it('should find a donation campaign by id', async () => {
    const donationCampaign = await service.findById('campaignId');

    expect(donationCampaign).toEqual({
      message: 'Campanha de doação encontrada com sucesso!',
      statusCode: 200,
      payload: {
        id: 'campaignId',
        title: 'Campaign title',
        description: 'Campaign description',
        goal: 1000,
        moneyRaised: 0,
        status: 'ACTIVE',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        campaignOrganizerId: 'campaignOrganizerId',
        campaignOrganizer: {
          id: 'campaignOrganizerId',
          email: 'campaignOrganizerEmail',
          firstName: 'campaignOrganizerFirstName',
          lastName: 'campaignOrganizerLastName',
          birthday: new Date('2023-11-22'),
          cpf: 'campaignOrganizerCpf',
          cnpj: null,
          password: 'campaignOrganizerPassword',
          status: 'ACTIVE',
          createdAt: new Date('2023-11-22'),
          updatedAt: new Date('2023-11-22'),
          deletedAt: null,
        },
      },
    });

    expect(mockDonationCampaignRepository.findById).toHaveBeenCalledWith(
      'campaignId',
    );
  });

  it('should update a donation campaign', async () => {
    const mockUpdateDto = {
      title: 'Updated Title',
      description: 'Campaign description',
      goal: 1500,
    };

    const donationCampaign = await service.update(
      mockCampaignId,
      mockUpdateDto,
      mockCurrentUserId,
    );

    expect(donationCampaign).toEqual({
      message: 'Campanha de doação atualizada com sucesso!',
      statusCode: 200,
      payload: {
        id: mockCampaignId,
        title: 'Updated Title',
        description: 'Campaign description',
        goal: 1500,
        moneyRaised: 0,
        status: 'ACTIVE',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        campaignOrganizerId: mockCurrentUserId,
      },
    });

    expect(mockDonationCampaignRepository.update).toHaveBeenCalledWith(
      mockCampaignId,
      mockUpdateDto,
    );
  });
});
