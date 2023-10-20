import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { DonationCampaignService } from './donation-campaign.service';

import { IResponse } from 'src/common/interfaces';

import { CreateDonationCampaignDto } from './dto';
import { UpdateDonationCampaignDto } from './dto';
import { GetCurrentUserId, Public } from 'src/common';

@Controller('donation-campaign')
export class DonationCampaignController {
  constructor(
    private readonly donationCampaignService: DonationCampaignService,
  ) {}

  @Post()
  async create(
    @Body() createDonationCampaignDto: CreateDonationCampaignDto,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } =
      (await this.donationCampaignService.create(
        createDonationCampaignDto,
        currentUserId,
      )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Public()
  @Get()
  async findAll() {
    const { message, statusCode, payload } =
      (await this.donationCampaignService.findAll()) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Public()
  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    const { message, statusCode, payload } =
      (await this.donationCampaignService.findById(id)) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Put('update/:id')
  async update(
    @Param('id') id: string,
    @Body() updateDonationCampaignDto: UpdateDonationCampaignDto,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.update(
        id,
        updateDonationCampaignDto,
        currentUserId,
      );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Patch('endDonationCampaign/:id')
  async endDonationCampaign(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.endDonationCampaign(id, currentUserId);
    return {
      message,
      statusCode,
      payload,
    };
  }

  @Delete('delete/:id')
  async delete(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
  ) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.delete(id, currentUserId);

    return {
      message,
      statusCode,
      payload,
    };
  }
}
