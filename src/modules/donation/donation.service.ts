import { Injectable } from '@nestjs/common';
import { CreateDonationDto } from './dto/create-donation.dto';
import { AppError, IResponse } from 'src/common';
import { DonationRepository } from './repositories';
import { DonationCampaignRepository } from '../donation-campaign/repositories';

@Injectable()
export class DonationService {
  constructor(
    private readonly donationRepository: DonationRepository,
    private readonly donationCampaignRepository: DonationCampaignRepository,
  ) {}

  async create(
    { donationCampaignId, moneyAmount }: CreateDonationDto,
    currentUserId: string,
  ): Promise<IResponse> {
    try {
      const donationCampaign = await this.donationCampaignRepository.findById(
        donationCampaignId,
      );

      if (!donationCampaign)
        throw new AppError('Campanha de doação não encontrada!', 404);

      if (donationCampaign.campaignOrganizerId === currentUserId)
        throw new AppError(
          'Você não pode doar para sua própria campanha de doação',
          400,
        );

      const donation = await this.donationRepository.create(
        { donationCampaignId, moneyAmount },
        currentUserId,
      );
      return {
        message: 'Doaçao realizada com sucesso!',
        statusCode: 201,
        payload: donation,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Donation: create',
        error.statusCode,
      );
    }
  }

  async findAllCampaignDonations(
    donationCampaignId: string,
    currentUserId: string,
  ): Promise<IResponse> {
    try {
      const donationCampaign = await this.donationCampaignRepository.findById(
        donationCampaignId,
      );

      if (!donationCampaign)
        throw new AppError('Campanha de doação não encontrada!', 404);

      if (donationCampaign.campaignOrganizerId !== currentUserId)
        throw new AppError(
          'Você não pode ver as doações de uma campanha que não é sua!',
          400,
        );

      const donations = await this.donationRepository.findAllCampaignDonations(
        donationCampaignId,
      );

      return {
        message: 'Doações encontradas com sucesso!',
        statusCode: 200,
        payload: donations,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Donation: findAllCampaignDonations',
        error.statusCode,
      );
    }
  }

  async findAllUserDonations(currentUserId: string): Promise<IResponse> {
    try {
      const donations = await this.donationRepository.findAllUserDonations(
        currentUserId,
      );

      return {
        message: 'Doações encontradas com sucesso!',
        statusCode: 200,
        payload: donations,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Donation: findAllUserDonations',
        error.statusCode,
      );
    }
  }

  async findById(id: string, currentUserId: string): Promise<IResponse> {
    try {
      const donation = await this.donationRepository.findOne(id);

      if (!donation) throw new AppError('Doação não encontrada!', 404);

      if (
        donation.donorId !== currentUserId &&
        donation.donationCampaign.campaignOrganizerId !== currentUserId
      )
        throw new AppError(
          'Você não pode ver os detalhes de uma doação que não é sua!',
          400,
        );

      return {
        message: 'Doação encontrada com sucesso!',
        statusCode: 200,
        payload: donation,
      };
    } catch (error) {}
  }
}
