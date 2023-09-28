import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { DonationCampaignModule } from './modules/donation-campaign/donation-campaign.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    DonationCampaignModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
