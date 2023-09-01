import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma';
import { CreateUserDto } from '../dto/create-user.dto';
import { UsersEntity } from 'src/common/entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

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

  async changePassword(id: string, newPassword: string): Promise<UsersEntity> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async findAll(): Promise<UsersEntity[]> {
    return this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<UsersEntity> {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
      include: {
        campaigns: true,
        donations: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UsersEntity> {
    return this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async update(
    id: string,
    {
      email,
      firstName,
      lastName,
      birthday,
      cpf,
      cnpj,
      password,
    }: UpdateUserDto,
  ): Promise<UsersEntity> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
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

  async softDelete(id: string): Promise<UsersEntity> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        status: 'INACTIVE',
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<UsersEntity> {
    return this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        status: 'ACTIVE',
        deletedAt: null,
      },
    });
  }

  async delete(id: string): Promise<UsersEntity> {
    return this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
