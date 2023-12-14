import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

import { GetCurrentUserId, IResponse } from 'src/common';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } = (await this.commentService.create(
      createCommentDto,
      currentUserId,
    )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findByDonationCampaignId/:donationCampaignId')
  async findByDonationCampaignId(
    @Param('donationCampaignId') donationCampaignId: string,
  ) {
    const { message, statusCode, payload } =
      (await this.commentService.findByDonationCampaignId(
        donationCampaignId,
      )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } = (await this.commentService.delete(
      id,
      currentUserId,
    )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }
}
