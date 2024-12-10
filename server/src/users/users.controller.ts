import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put(':id')
  update(
    @Body() updateUserDto: Omit<UpdateUserDto, 'id'>,
    @Param('id') id: string,
  ) {
    return this.usersService.updateUser({ id, ...updateUserDto });
  }
}
