import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config';
import { CreateDonationDto } from '../dto/create-donation.dto';
import { DonationEntity } from 'src/common';

@Injectable()
export class DonationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { donationCampaignId, moneyAmount }: CreateDonationDto,
    currentUserId: string,
  ): Promise<DonationEntity> {
    return await this.prismaService.donation.create({
      data: {
        donationCampaign: {
          connect: {
            id: donationCampaignId,
          },
        },
        donor: {
          connect: {
            id: currentUserId,
          },
        },
        moneyAmount,
      },
    });
  }

  async findAllCampaignDonations(
    donationCampaignId: string,
  ): Promise<DonationEntity[]> {
    return await this.prismaService.donation.findMany({
      where: {
        donationCampaignId,
      },
      include: {
        donor: true,
      },
    });
  }

  async findAllUserDonations(currentUserId: string): Promise<DonationEntity[]> {
    return await this.prismaService.donation.findMany({
      where: {
        donorId: currentUserId,
      },
      include: {
        donationCampaign: true,
      },
    });
  }

  async findOne(id: string): Promise<DonationEntity> {
    return await this.prismaService.donation.findUnique({
      where: {
        id,
      },
      include: {
        donor: true,
        donationCampaign: true,
      },
    });
  }
}
