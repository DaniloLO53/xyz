import { Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { Request } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { RefreshGuard } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalGuard)
  signIn(@Req() req: Request) {
    return req.user;
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  refreshTokens(@Req() req: Request) {
    return req.user;
  }

  @Delete('signout')
  @UseGuards(JwtAuthGuard)
  signout(@Req() req) {
    console.log('SIGNOUT');
    console.log('req.user', req.user);
    return this.authService.deleteRefreshToken(req.user.userId);
  }

  @Get('status')
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    console.log('req.user', req.user);
    return req.user;
  }
}
