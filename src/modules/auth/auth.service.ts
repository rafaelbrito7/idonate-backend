import { Injectable } from '@nestjs/common';
import { SignInDto } from './dto/signin.dto';
import { UserRepository } from '../user/repositories';
import { AppConfigService } from 'src/config';
import { JwtService } from '@nestjs/jwt';
import { AppError } from 'src/common/errors';
import { compare } from 'bcrypt';
import { SignUpDto } from './dto';
import { IResponse } from 'src/common';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: AppConfigService,
  ) {}

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.userRepository.updateRtHash(userId, hash);
  }

  async signUp({
    email,
    firstName,
    lastName,
    birthday,
    cpf,
    password,
  }: SignUpDto): Promise<IResponse> {
    try {
      const userExists = await this.userRepository.findByEmail(email);
      if (userExists) throw new AppError('Usuário já cadastrado.', 400);

      const hashedPassword = await this.hashData(password);
      const newUser = await this.userRepository.create({
        email,
        firstName,
        lastName,
        birthday,
        cpf,
        password: hashedPassword,
      });
      delete newUser.password;

      const tokens = await this.getTokens(newUser.id, newUser.email);
      await this.updateRtHash(newUser.id, tokens.refresh_token);

      return {
        message: 'Usuário criado com sucesso!',
        statusCode: 201,
        payload: tokens,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: signUp',
        error.statusCode,
      );
    }
  }

  async signIn({ email, password }: SignInDto): Promise<IResponse> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new AppError('Usuário não encontrado!', 400);

      const passwordMatches = await compare(password, user.password);
      if (!passwordMatches)
        throw new AppError(
          'Password não confere com o usuário informado!',
          401,
        );

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return {
        message: 'User authenticated with success.',
        statusCode: 200,
        payload: {
          tokens,
        },
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users:signIn',
        error.statusCode,
      );
    }
  }

  async logout(userId: string) {
    try {
      await this.userRepository.removeRtHash(userId);
      return {
        message: 'User logged out with success.',
        statusCode: 200,
        payload: {},
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users:logout',
        error.statusCode,
      );
    }
  }

  // async refresh() {}

  //Utility functions

  async hashData(data: string) {
    return hash(data, 10);
  }

  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.jwtSecrets.at,
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.jwtSecrets.rt,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
