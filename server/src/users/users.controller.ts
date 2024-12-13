import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizedRequest } from 'src/types/authorizedRequest';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(
    @Body() updateUserDto: Omit<UpdateUserDto, 'id'>,
    @Req() req: AuthorizedRequest,
  ) {
    return this.usersService.updateUser({
      id: req.user.userId,
      ...updateUserDto,
    });
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  delete(@Req() req: AuthorizedRequest) {
    return this.usersService.deleteUser(req.user.userId);
  }
}
