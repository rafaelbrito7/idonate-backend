import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { CreateDonationCampaignDto } from '../dto/create-donation-campaign.dto';
import { DonationCampaignEntity } from 'src/common/entities/donation-campaign.entity';
import { UpdateDonationCampaignDto } from '../dto/update-donation-campaign.dto';

@Injectable()
export class DonationCampaignRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { title, description, goal }: CreateDonationCampaignDto,
    currentUserId: string,
  ): Promise<DonationCampaignEntity> {
    return this.prismaService.donationCampaign.create({
      data: {
        campaignOrganizer: {
          connect: {
            id: currentUserId,
          },
        },
        title,
        description,
        goal,
      },
    });
  }

  async findAll(): Promise<DonationCampaignEntity[]> {
    return this.prismaService.donationCampaign.findMany();
  }

  async findById(id: string): Promise<DonationCampaignEntity> {
    return this.prismaService.donationCampaign.findUnique({
      where: {
        id,
      },
      include: {
        campaignOrganizer: true,
      },
    });
  }

  async update(
    id: string,
    { description, goal, title }: UpdateDonationCampaignDto,
  ): Promise<DonationCampaignEntity> {
    return await this.prismaService.donationCampaign.update({
      where: {
        id,
      },
      data: {
        description,
        goal,
        title,
      },
    });
  }

  async endDonationCampaign(id: string): Promise<DonationCampaignEntity> {
    return await this.prismaService.donationCampaign.update({
      where: {
        id,
      },
      data: {
        status: 'ENDED',
      },
    });
  }

  async delete(id: string): Promise<DonationCampaignEntity> {
    return await this.prismaService.donationCampaign.delete({
      where: {
        id,
      },
    });
  }
}
