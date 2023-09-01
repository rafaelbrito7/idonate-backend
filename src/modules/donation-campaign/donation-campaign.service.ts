import { Injectable } from '@nestjs/common';
import { CreateDonationCampaignDto } from './dto/create-donation-campaign.dto';
import { DonationCampaignRepository } from './repositories/donation-campaign.repository';
import { AppError } from 'src/common/errors/types/AppError';
import { UpdateDonationCampaignDto } from './dto/update-donation-campaign.dto';
import { IResponse } from 'src/common/interfaces/shared/IResponse';

@Injectable()
export class DonationCampaignService {
  constructor(
    private readonly donationCampaignRepository: DonationCampaignRepository,
  ) {}

  async create({
    title,
    description,
    goal,
    campaignOrganizerId,
  }: CreateDonationCampaignDto) {
    try {
      const donationCampaign = await this.donationCampaignRepository.create({
        title,
        description,
        goal,
        campaignOrganizerId,
      });

      return {
        statusCode: 201,
        message: 'Campanha de doação criada com sucesso!',
        payload: donationCampaign,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch DonationCampaign: create',
        error.statusCode,
      );
    }
  }

  async findById(id: string) {
    try {
      const donationCampaign = await this.donationCampaignRepository.findById(
        id,
      );

      if (!donationCampaign)
        throw new AppError('Campanha de doação não encontrada!', 404);

      return {
        message: 'Campanha de doação encontrada com sucesso!',
        statusCode: 200,
        payload: donationCampaign,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch DonationCampaign: findById',
        error.statusCode,
      );
    }
  }

  async findAll() {
    try {
      const donationCampaigns = this.donationCampaignRepository.findAll();

      return {
        message: 'Campanhas de doação encontradas com sucesso!',
        statusCode: 200,
        payload: donationCampaigns,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch DonationCampaign: findAll',
        error.statusCode,
      );
    }
  }

  async update(
    id: string,
    updateDonationCampaignDto: UpdateDonationCampaignDto,
  ): Promise<IResponse> {
    try {
      const donationCampaign = await this.donationCampaignRepository.findById(
        id,
      );
      if (!donationCampaign)
        throw new AppError('Campanha de doação não encontrada!', 404);

      const updatedDonationCampaign =
        await this.donationCampaignRepository.update(
          id,
          updateDonationCampaignDto,
        );

      return {
        message: 'Campanha de doação atualizada com sucesso!',
        statusCode: 200,
        payload: updatedDonationCampaign,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch DonationCampaign: update',
        error.statusCode,
      );
    }
  }

  async delete(id: string) {
    const NO_DONATIONS = 0;

    try {
      const donationCampaign = await this.donationCampaignRepository.findById(
        id,
      );
      if (!donationCampaign)
        throw new AppError('Campanha de doação não encontrada!', 404);

      if (donationCampaign.moneyRaised > NO_DONATIONS)
        throw new AppError(
          'Campanha de doação não pode ser excluída pois já possui doações!',
          400,
        );

      await this.donationCampaignRepository.delete(id);

      return {
        message: 'Campanha de doação excluída com sucesso!',
        statusCode: 200,
        payload: null,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch DonationCampaign: delete',
        error.statusCode,
      );
    }
  }
}
