import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { DonationCampaignService } from './donation-campaign.service';
import { CreateDonationCampaignDto } from './dto/create-donation-campaign.dto';

import { IResponse } from 'src/common/interfaces/shared/IResponse';

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

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateDonationCampaignDto: UpdateDonationCampaignDto,
  // ) {
  //   return this.donationCampaignService.update(+id, updateDonationCampaignDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.donationCampaignService.remove(+id);
  // }
}
