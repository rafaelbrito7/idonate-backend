import { Comment } from '@prisma/client';

export class CommentEntity implements Comment {
  id: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  userId: string;
  donationCampaignId: string;
}
