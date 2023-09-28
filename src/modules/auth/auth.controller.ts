import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { AuthService } from './auth.service';

import { SignInDto, SignUpDto } from './dto';

import { IResponse } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Post('logout')
  async logout(@Req() req: Request) {
    const user = req.user;
    const { message, statusCode, payload } = await this.authService.logout(
      user['sub'],
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  // @Post('refresh')
  // async refresh() {}
}
