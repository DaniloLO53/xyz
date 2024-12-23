import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WalletService } from './wallets.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizedRequest } from 'src/types/authorizedRequest';
import { UpdateWalletDto } from './dto/updateWallet.dto';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findWalllet(@Req() req: AuthorizedRequest) {
    return this.walletService.find(req.user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createWalllet(
    @Req() req: AuthorizedRequest,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.walletService.create(req.user.userId, createWalletDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateWalllet(
    @Req() req: AuthorizedRequest,
    @Body() updateWalletDto: UpdateWalletDto,
    @Param('id') walletId: string,
  ) {
    return this.walletService.update(req.user.userId, {
      walletId,
      ...updateWalletDto,
    });
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteWalllet(@Req() req: AuthorizedRequest, @Param('id') walletId: string) {
    return this.walletService.delete({ userId: req.user.userId, walletId });
  }
}
