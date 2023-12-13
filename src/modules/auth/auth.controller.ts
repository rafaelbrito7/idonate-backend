import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { AuthService } from './auth.service';

import { RegisterDto, LoginDto } from './dto';

import { GetCurrentUser, GetCurrentUserId, IResponse } from 'src/common';
import { RtGuard } from 'src/common/guards';
import { Public } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() registerDto: RegisterDto): Promise<IResponse> {
    const { message, statusCode, payload } = (await this.authService.register(
      registerDto,
    )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Public()
  @Post('login')
  async login(@Body() { email, password }: LoginDto): Promise<IResponse> {
    const { message, statusCode, payload } = (await this.authService.login({
      email,
      password,
    })) as IResponse;

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

  // @Public()
  // @UseGuards(RtGuard)
  // @Post('refresh')
  // async refresh(
  //   @GetCurrentUserId() userId: string,
  //   @GetCurrentUser('refreshToken') refreshToken: string,
  // ) {
  //   const { message, statusCode, payload } = await this.authService.refresh(
  //     userId,
  //     refreshToken,
  //   );

  //   return {
  //     message,
  //     statusCode,
  //     payload,
  //   };
  // }
}
