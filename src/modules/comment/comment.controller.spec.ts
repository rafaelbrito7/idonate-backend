import { Test, TestingModule } from '@nestjs/testing';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

describe('CommentController', () => {
  let controller: CommentController;

  const mockCurrentUserId = 'currentUserId';
  const mockCommentId = 'commentId';

  const mockComment = {
    id: mockCommentId,
    content: 'Comment content',
    createdAt: new Date('2023-11-22'),
    updatedAt: new Date('2023-11-22'),
    deletedAt: null,
    userId: mockCurrentUserId,
  };

  const mockCommentService = {
    create: jest.fn((createCommentDto, currentUserId) => ({
      message: 'Comentário criado com sucesso!',
      statusCode: 201,
      payload: {
        id: 'commentId',
        ...createCommentDto,
        userId: currentUserId,
      },
    })),

    findByDonationCampaignId: jest.fn((donationCampaignId) => ({
      message: 'Comentários encontrados com sucesso!',
      statusCode: 200,
      payload: {
        donationCampaignId,
        comments: [mockComment],
      },
    })),

    delete: jest.fn((id) => ({
      message: 'Comentário deletado com sucesso!',
      statusCode: 200,
      payload: {
        id,
        ...mockComment,
      },
    })),

    deleteByUserId: jest.fn((userId) => ({
      message: 'Comentários deletados com sucesso!',
      statusCode: 200,
      payload: null,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [CommentService],
    })
      .overrideProvider(CommentService)
      .useValue(mockCommentService)
      .compile();

    controller = module.get<CommentController>(CommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a comment', async () => {
    const mockCreateDto = {
      description: 'Comment content',
      donationCampaignId: 'donationCampaignId',
    };

    const comment = await controller.create(mockCreateDto, mockCurrentUserId);

    expect(comment).toEqual({
      message: 'Comentário criado com sucesso!',
      statusCode: 201,
      payload: {
        id: 'commentId',
        ...mockCreateDto,
        userId: mockCurrentUserId,
      },
    });

    expect(mockCommentService.create).toHaveBeenCalledWith(
      mockCreateDto,
      mockCurrentUserId,
    );
  });

  it('should find all comments by donation campaign id', async () => {
    const mockDonationCampaignId = 'donationCampaignId';

    const comments = await controller.findByDonationCampaignId(
      mockDonationCampaignId,
    );

    expect(comments).toEqual({
      message: 'Comentários encontrados com sucesso!',
      statusCode: 200,
      payload: {
        donationCampaignId: mockDonationCampaignId,
        comments: [mockComment],
      },
    });

    expect(mockCommentService.findByDonationCampaignId).toHaveBeenCalledWith(
      mockDonationCampaignId,
    );
  });

  it('should delete a comment', async () => {
    const comment = await controller.delete(mockCommentId, mockCurrentUserId);

    expect(comment).toEqual({
      message: 'Comentário deletado com sucesso!',
      statusCode: 200,
      payload: {
        id: mockCommentId,
        ...mockComment,
      },
    });

    expect(mockCommentService.delete).toHaveBeenCalledWith(
      mockCommentId,
      mockCurrentUserId,
    );
  });
});
