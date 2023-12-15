import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentRepository } from './repositories';
import { AppError } from 'src/common';

@Injectable()
export class CommentService {
  constructor(private readonly commentRepository: CommentRepository) {}

  async create(
    { content, donationCampaignId }: CreateCommentDto,
    currentUserId: string,
  ) {
    try {
      const comment = await this.commentRepository.create(
        {
          content,
          donationCampaignId,
        },
        currentUserId,
      );

      return {
        statusCode: 201,
        message: 'Comentário criado com sucesso!',
        payload: comment,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Comment: create',
        error.statusCode,
      );
    }
  }

  async findByDonationCampaignId(donationCampaignId: string) {
    try {
      const comments = await this.commentRepository.findByDonationCampaignId(
        donationCampaignId,
      );

      return {
        message: 'Comentários encontrados com sucesso!',
        statusCode: 200,
        payload: {
          donationCampaignId,
          comments,
        },
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Comment: findByDonationCampaignId',
        error.statusCode,
      );
    }
  }

  async delete(id: string, currentUserId: string) {
    try {
      const comment = await this.commentRepository.findById(id);

      if (comment.userId !== currentUserId) {
        throw new AppError(
          'Usuário não possui permissão para deletar comentário que não é de sua autoria.',
          403,
        );
      }

      await this.commentRepository.delete(id);

      return {
        message: 'Comentário deletado com sucesso!',
        statusCode: 200,
        payload: null,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Comment: delete',
        error.statusCode,
      );
    }
  }
}
