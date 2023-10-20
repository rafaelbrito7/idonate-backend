import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DonationService } from './donation.service';
import { CreateDonationDto } from './dto/create-donation.dto';
import { GetCurrentUserId, IResponse } from 'src/common';

@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Post()
  async create(
    @Body() createDonationDto: CreateDonationDto,
    @GetCurrentUserId() currentUserId: string,
  ): Promise<IResponse> {
    const { message, statusCode, payload } = await this.donationService.create(
      createDonationDto,
      currentUserId,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findAllUserDonations')
  async findAllUserDonations(
    @GetCurrentUserId() currentUserId: string,
  ): Promise<IResponse> {
    const { message, statusCode, payload } =
      await this.donationService.findAllUserDonations(currentUserId);

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findAllCampaignDonations/:id')
  async findAllCampaignDonations(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
  ): Promise<IResponse> {
    const { message, statusCode, payload } =
      await this.donationService.findAllCampaignDonations(id, currentUserId);

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findById/:id')
  async findById(
    @Param('id') id: string,
    @GetCurrentUserId() currentUserId: string,
  ): Promise<IResponse> {
    const { message, statusCode, payload } =
      await this.donationService.findById(id, currentUserId);

    return {
      message,
      statusCode,
      payload,
    };
  }
}
