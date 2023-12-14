import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    { description, donationCampaignId }: CreateCommentDto,
    currentUserId: string,
  ) {
    return await this.prismaService.comment.create({
      data: {
        user: {
          connect: {
            id: currentUserId,
          },
        },
        campaign: {
          connect: {
            id: donationCampaignId,
          },
        },
        description,
      },
    });
  }

  async findByDonationCampaignId(donationCampaignId: string) {
    return await this.prismaService.comment.findMany({
      where: {
        campaignId: donationCampaignId,
      },
      include: {
        user: true,
      },
    });
  }

  async findById(id: string) {
    return await this.prismaService.comment.findUnique({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    await this.prismaService.comment.delete({
      where: {
        id,
      },
    });
  }
}
