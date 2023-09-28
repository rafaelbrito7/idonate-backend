import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DonationCampaignService } from './donation-campaign.service';

import { IResponse } from 'src/common/interfaces';

import { CreateDonationCampaignDto } from './dto';
import { UpdateDonationCampaignDto } from './dto';

import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('donation-campaign')
export class DonationCampaignController {
  constructor(
    private readonly donationCampaignService: DonationCampaignService,
  ) {}

  @Post()
  async create(@Body() createDonationCampaignDto: CreateDonationCampaignDto) {
    const { message, statusCode, payload } =
      (await this.donationCampaignService.create(
        createDonationCampaignDto,
      )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

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
  ) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.update(id, updateDonationCampaignDto);

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Patch('endDonationCampaign/:id')
  async endDonationCampaign(@Param('id') id: string) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.endDonationCampaign(id);
    return {
      message,
      statusCode,
      payload,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const { message, statusCode, payload } =
      await this.donationCampaignService.delete(id);

    return {
      message,
      statusCode,
      payload,
    };
  }
}
