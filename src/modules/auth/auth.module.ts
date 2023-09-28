import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from '../user/repositories';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '../user';
import { AppConfigModule, AppConfigService, PrismaService } from 'src/config';
import { AtStrategy, RtStrategy } from './strategies';

//TODO: Finish JWT Video: https://youtu.be/uAKzFhE3rxU?si=Pzf-3sl3OWcjNhMq&t=4112

@Module({
  imports: [
    AppConfigModule,
    JwtModule.register({}),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    AppConfigService,
    PrismaService,
    UserRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
