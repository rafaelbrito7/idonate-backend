import { Test, TestingModule } from '@nestjs/testing';
import { CommentService } from './comment.service';
import { CommentRepository } from './repositories';

describe('CommentService', () => {
  let service: CommentService;

  const mockCurrentUserId = 'currentUserId';
  const mockCommentId = 'commentId';

  const mockCommentRepository = {
    create: jest.fn((createCommentDto, currentUserId) => ({
      id: 'commentId',
      ...createCommentDto,
      userId: currentUserId,
    })),
    findByDonationCampaignId: jest.fn((donationCampaignId) => [
      {
        id: mockCommentId,
        content: 'Comment content',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: null,
        userId: mockCurrentUserId,
      },
    ]),
    delete: jest.fn((id) => ({
      id,
      content: 'Comment content',
      createdAt: new Date('2023-11-22'),
      updatedAt: new Date('2023-11-22'),
      deletedAt: new Date('2023-11-22'),
      userId: mockCurrentUserId,
    })),
    deleteByUserId: jest.fn((userId) => null),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a comment', async () => {
    const mockCreateDto = {
      content: 'Comment content',
    };

    const comment = await service.create(mockCreateDto, mockCurrentUserId);

    expect(comment).toEqual({
      message: 'Comentário criado com sucesso!',
      statusCode: 201,
      payload: {
        id: 'commentId',
        ...mockCreateDto,
        userId: mockCurrentUserId,
      },
    });

    expect(mockCommentRepository.create).toHaveBeenCalledWith(
      mockCreateDto,
      mockCurrentUserId,
    );
  });

  it('should find comments by donation campaign id', async () => {
    const donationCampaignId = 'donationCampaignId';

    const comments = await service.findByDonationCampaignId(donationCampaignId);

    expect(comments).toEqual({
      message: 'Comentários encontrados com sucesso!',
      statusCode: 200,
      payload: {
        donationCampaignId,
        comments: [
          {
            id: mockCommentId,
            content: 'Comment content',
            createdAt: new Date('2023-11-22'),
            updatedAt: new Date('2023-11-22'),
            deletedAt: null,
            userId: mockCurrentUserId,
          },
        ],
      },
    });

    expect(mockCommentRepository.findByDonationCampaignId).toHaveBeenCalledWith(
      donationCampaignId,
    );
  });

  it('should delete a comment', async () => {
    const comment = await service.delete(mockCommentId, mockCurrentUserId);

    expect(comment).toEqual({
      message: 'Comentário deletado com sucesso!',
      statusCode: 200,
      payload: {
        id: mockCommentId,
        content: 'Comment content',
        createdAt: new Date('2023-11-22'),
        updatedAt: new Date('2023-11-22'),
        deletedAt: new Date('2023-11-22'),
        userId: mockCurrentUserId,
      },
    });

    expect(mockCommentRepository.delete).toHaveBeenCalledWith(mockCommentId);
  });

  it('should delete all comments by user id', async () => {
    const comment = await service.deleteByUserId(mockCurrentUserId);

    expect(comment).toEqual({
      message: 'Comentários deletados com sucesso!',
      statusCode: 200,
      payload: null,
    });

    expect(mockCommentRepository.deleteByUserId).toHaveBeenCalledWith(
      mockCurrentUserId,
    );
  });
});
