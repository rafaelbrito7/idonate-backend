import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { PrismaModule } from './config/prisma/prisma.module';
import { DonationCampaignModule } from './modules/donation-campaign/donation-campaign.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { DonationModule } from './modules/donation/donation.module';
import { CommentModule } from './modules/comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    PrismaModule,
    DonationCampaignModule,
    AuthModule,
    DonationModule,
    CommentModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
