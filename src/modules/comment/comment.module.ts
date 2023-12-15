import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './repositories';

@Module({
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
