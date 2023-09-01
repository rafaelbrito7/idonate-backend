import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { CreateDonationCampaignDto } from '../dto/create-donation-campaign.dto';
import { DonationCampaignsEntity } from 'src/common/entities/donation-campaign.entity';
import { UpdateDonationCampaignDto } from '../dto/update-donation-campaign.dto';

@Injectable()
export class DonationCampaignRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    title,
    description,
    goal,
    campaignOrganizerId,
  }: CreateDonationCampaignDto): Promise<DonationCampaignsEntity> {
    return this.prismaService.donationCampaign.create({
      data: {
        campaignOrganizer: {
          connect: {
            id: campaignOrganizerId,
          },
        },
        title,
        description,
        goal,
      },
    });
  }

  async findAll(): Promise<DonationCampaignsEntity[]> {
    return this.prismaService.donationCampaign.findMany({
      include: {
        campaignOrganizer: true,
      },
    });
  }

  async findById(id: string): Promise<DonationCampaignsEntity> {
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
  ): Promise<DonationCampaignsEntity> {
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

  //Donation campaign owner ends the campaign before the goal is reached
  async endDonationCampaign(id: string): Promise<DonationCampaignsEntity> {
    return await this.prismaService.donationCampaign.update({
      where: {
        id,
      },
      data: {
        status: 'ENDED',
      },
    });
  }

  async delete(id: string): Promise<DonationCampaignsEntity> {
    return await this.prismaService.donationCampaign.delete({
      where: {
        id,
      },
    });
  }
}
