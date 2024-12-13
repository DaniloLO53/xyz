import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { WalletService } from './wallets.service';
import { CreateWalletDto } from './dto/createWallet.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthorizedRequest } from 'src/types/authorizedRequest';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async findAll() {
    return this.walletService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createWalllet(
    @Req() req: AuthorizedRequest,
    @Body() createWalletDto: CreateWalletDto,
  ) {
    return this.walletService.create(req.user.userId, createWalletDto);
  }
}
