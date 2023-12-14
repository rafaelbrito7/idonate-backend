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
    password,
  }: CreateUserDto): Promise<UsersEntity> {
    return await this.prismaService.user.create({
      data: {
        email,
        firstName,
        lastName,
        birthday,
        cpf,
        password,
      },
    });
  }

  async changePassword(id: string, newPassword: string): Promise<UsersEntity> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password: newPassword,
      },
    });
  }

  async findAll(): Promise<UsersEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<UsersEntity> {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        campaigns: true,
        donations: true,
      },
    });
  }

  async findByEmail(email: string): Promise<UsersEntity> {
    return await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async findByCpf(cpf: string): Promise<UsersEntity> {
    return await this.prismaService.user.findFirst({
      where: {
        cpf: cpf,
      },
    });
  }

  async update(
    id: string,
    { email, firstName, lastName, birthday, cpf, password }: UpdateUserDto,
  ): Promise<UsersEntity> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        email,
        firstName,
        lastName,
        birthday,
        cpf,
        password,
      },
    });
  }

  async softDelete(id: string): Promise<UsersEntity> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        status: 'INACTIVE',
        deletedAt: new Date(),
      },
    });
  }

  async restore(id: string): Promise<UsersEntity> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        status: 'ACTIVE',
        deletedAt: null,
      },
    });
  }

  async updateRtHash(id: string, hash: string): Promise<UsersEntity> {
    return await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async removeRtHash(id: string) {
    return await this.prismaService.user.updateMany({
      where: {
        id,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
  }

  async delete(id: string): Promise<UsersEntity> {
    return await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }
}
