import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Patch,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { IResponse } from 'src/common/interfaces/shared/IResponse';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangeUsersPasswordDto } from './dto/change-users-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const { message, statusCode, payload } = (await this.userService.create(
      createUserDto,
    )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Post('changePassword/:id')
  async changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangeUsersPasswordDto,
  ) {
    const { message, statusCode, payload } =
      (await this.userService.changePassword(
        id,
        changePasswordDto,
      )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get()
  async findAll() {
    const { message, statusCode, payload } =
      (await this.userService.findAll()) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findById/:id')
  async findById(@Param('id') id: string) {
    const { message, statusCode, payload } = (await this.userService.findById(
      id,
    )) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Get('findByEmail')
  async findByEmail(@Query('email') email: string) {
    const { message, statusCode, payload } =
      (await this.userService.findByEmail(email)) as IResponse;

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Put('update/:id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { message, statusCode, payload } = await this.userService.update(
      id,
      updateUserDto,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Patch('softDelete/:id')
  async remove(@Param('id') id: string) {
    const { message, statusCode, payload } = await this.userService.softDelete(
      id,
    );

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Patch('restore/:id')
  async restore(@Param('id') id: string) {
    const { message, statusCode, payload } = await this.userService.restore(id);

    return {
      message,
      statusCode,
      payload,
    };
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    const { message, statusCode, payload } = await this.userService.delete(id);

    return {
      message,
      statusCode,
      payload,
    };
  }
}
