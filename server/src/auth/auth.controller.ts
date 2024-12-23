import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';
import { AuthorizedRequest } from 'src/types/authorizedRequest';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signIn(@Req() req: AuthorizedRequest) {
    console.log('SIGN IN');
    return req.user;
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  refreshTokens(@Req() req: AuthorizedRequest) {
    return req.user;
  }

  @Delete('signout')
  @UseGuards(JwtAuthGuard)
  signout(@Req() req: AuthorizedRequest) {
    return this.authService.deleteRefreshToken(req.user.userId);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: AuthorizedRequest) {
    return req.user;
  }
}
