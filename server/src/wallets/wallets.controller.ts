import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallets.service';

@Controller('wallets')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async findAll() {
    return this.walletService.findAll();
  }
}
