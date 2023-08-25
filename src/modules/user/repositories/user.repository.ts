import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersEntity } from 'src/common/user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create({
    email,
    firstName,
    lastName,
    birthday,
    cpf,
    cnpj,
    password,
  }: CreateUserDto): Promise<UsersEntity> {
    return this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        birthday,
        cpf,
        cnpj,
        password,
      },
    });
  }
}
