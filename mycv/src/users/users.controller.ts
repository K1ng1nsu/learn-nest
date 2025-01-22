import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { IsEmail } from 'class-validator';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private userSerive: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log(body);
    return this.userSerive.create(body);
  }

  @Get('/:id')
  async findUser(@Param('id', ParseIntPipe) id: string) {
    console.log(id);
    const user = await this.userSerive.findOne(+id);
    if (!user) throw new NotFoundException('해당 유저를 찾을 수 없음');

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userSerive.find(email);
  }

  @Patch('/:id')
  updateUser(
    @Param('id', ParseIntPipe) id: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.userSerive.update(+id, body);
  }

  @Delete('/:id')
  removeUser(@Param('id', ParseIntPipe) id: string) {
    return this.userSerive.remove(+id);
  }
}
