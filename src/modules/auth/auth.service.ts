import { Injectable } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto';
import { UserRepository } from '../user/repositories';
import { AppConfigService } from 'src/config';
import { JwtService } from '@nestjs/jwt';
import { AppError } from 'src/common/errors';
import { compare, hash } from 'bcrypt';

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

  async register({
    email,
    firstName,
    lastName,
    birthday,
    cpf,
    password,
  }: RegisterDto) {
    try {
      const userEmailExists = await this.userRepository.findByEmail(email);
      if (userEmailExists) throw new AppError('Usuário já cadastrado.', 400);

      const userCpfExists = await this.userRepository.findByCpf(cpf);
      if (userCpfExists) throw new AppError('Usuário já cadastrado.', 400);

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

      return {
        message: 'Usuário criado com sucesso!',
        statusCode: 201,
        payload: newUser,
      };
    } catch (error) {
      throw new AppError(
        'error?.message' || 'Error catch Users: signUp',
        error.statusCode,
      );
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user)
        throw new AppError('Password ou usuário estão incorretos!', 401);

      const passwordMatches = await compare(password, user.password);
      if (!passwordMatches)
        throw new AppError('Password ou usuário estão incorretos!', 401);

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return {
        message: 'Usuário autenticado com sucesso!',
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
        message: 'Usuário realizou logout com sucesso!',
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

  async refresh(userId: string, rt: string) {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user || !user.hashedRt) throw new AppError('Unauthorized!', 404);

      const isRtTheSame = await compare(rt, user.hashedRt);
      if (!isRtTheSame)
        throw new AppError(
          'Refresh Token não é compatível com o armazenado!',
          403,
        );

      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRtHash(user.id, tokens.refresh_token);

      return {
        message: 'Tokens atualizados com sucesso!',
        statusCode: 200,
        payload: {
          tokens,
        },
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users:refresh',
        error.statusCode,
      );
    }
  }

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
