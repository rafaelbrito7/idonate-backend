import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './repositories/user.repository';
import { IResponse } from 'src/common/interfaces/shared/IResponse';
import { AppError } from 'src/common/errors/types/AppError';
import { hash, compare } from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUsersPasswordDto } from './dto/change-users-password.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  private async ensureUserExists(id?: string, email?: string) {
    if (!id && !email) throw new AppError('Informe o id ou email do usuário!');

    if (id) {
      const user = await this.userRepository.findById(id);
      if (!user) throw new AppError('Usuário não encontrado!', 404);
      return user;
    }

    if (email) {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new AppError('Usuário não encontrado!', 404);
      return user;
    }
  }

  async create({
    email,
    firstName,
    lastName,
    birthday,
    cpf,
    cnpj,
    password,
  }: CreateUserDto): Promise<IResponse> {
    try {
      const userExists = await this.userRepository.findByEmail(email);
      if (userExists) throw new AppError('Usuário já cadastrado.', 400);

      const hashedPassword = await hash(password, 10);

      const user = await this.userRepository.create({
        email,
        firstName,
        lastName,
        birthday,
        cpf,
        cnpj,
        password: hashedPassword,
      });

      delete user.password;

      return {
        message: 'Usuário criado com sucesso!',
        statusCode: 201,
        payload: user,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: create',
        error.statusCode,
      );
    }
  }

  async changePassword(
    id: string,
    { oldPassword, newPassword }: ChangeUsersPasswordDto,
  ): Promise<IResponse> {
    try {
      const user = await this.ensureUserExists(id, undefined);

      const passwordMatch = await compare(oldPassword, user.password);
      if (!passwordMatch) throw new AppError('Senha antiga não confere!', 400);

      const hashedNewPassword = await hash(newPassword, 10);

      await this.userRepository.changePassword(user.id, hashedNewPassword);

      return {
        message: 'Senha alterada com sucesso!',
        statusCode: 200,
        payload: {},
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: changePassword',
        error.statusCode,
      );
    }
  }

  async findAll() {
    try {
      const users = await this.userRepository.findAll();

      return {
        message: 'Usuários encontrados com sucesso!',
        statusCode: 200,
        payload: users,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: findAll',
        error.statusCode,
      );
    }
  }

  async findById(id: string) {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new AppError('Usuário não encontrado!', 404);

      delete user.password;

      return {
        message: 'Usuário encontrado com sucesso!',
        statusCode: 200,
        payload: user,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: findById',
        error.statusCode,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new AppError('Usuário não encontrado!', 404);

      delete user.password;

      return {
        message: 'Usuário encontrado com sucesso!',
        statusCode: 200,
        payload: user,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: findByEmail',
        error.statusCode,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      await this.ensureUserExists(id, undefined);

      const updatedUser = await this.userRepository.update(id, updateUserDto);

      return {
        message: 'Usuário atualizado com sucesso!',
        statusCode: 200,
        payload: updatedUser,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: update',
        error.statusCode,
      );
    }
  }

  async softDelete(id: string) {
    try {
      await this.ensureUserExists(id, undefined);

      const softDeletedUser = await this.userRepository.softDelete(id);

      return {
        message: 'Usuário desativado com sucesso!',
        statusCode: 200,
        payload: softDeletedUser,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: softDelete',
        error.statusCode,
      );
    }
  }

  async restore(id: string) {
    try {
      await this.ensureUserExists(id, undefined);

      const restoredUser = await this.userRepository.restore(id);

      return {
        message: 'Usuário restaurado com sucesso!',
        statusCode: 200,
        payload: restoredUser,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: restore',
        error.statusCode,
      );
    }
  }

  async delete(id: string) {
    try {
      await this.ensureUserExists(id, undefined);

      const deletedUser = await this.userRepository.delete(id);

      return {
        message: 'Usuário excluído com sucesso!',
        statusCode: 200,
        payload: deletedUser,
      };
    } catch (error) {
      throw new AppError(
        error?.message || 'Error catch Users: delete',
        error.statusCode,
      );
    }
  }
}
