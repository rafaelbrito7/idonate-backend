import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { DonationCampaignModule } from './modules/donation-campaign/donation-campaign.module';

@Module({
  imports: [UserModule, PrismaModule, DonationCampaignModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
