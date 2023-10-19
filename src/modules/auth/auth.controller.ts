import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { SignInDto, SignUpDto } from './dto';

import { GetCurrentUser, GetCurrentUserId, IResponse } from 'src/common';
import { RtGuard } from 'src/common/guards';
import { Public } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto): Promise<IResponse> {
    const { message, statusCode, payload } = await this.authService.signUp(
      signUpDto,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Public()
  @Post('signIn')
  async signIn(@Body() { email, password }: SignInDto): Promise<IResponse> {
    const { message, statusCode, payload } = await this.authService.signIn({
      email,
      password,
    });

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Post('logout')
  async logout(@GetCurrentUserId() userId: string) {
    const { message, statusCode, payload } = await this.authService.logout(
      userId,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refresh(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    const { message, statusCode, payload } = await this.authService.refresh(
      userId,
      refreshToken,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }
}
