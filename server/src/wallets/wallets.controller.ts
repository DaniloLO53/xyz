import { Controller, Get } from '@nestjs/common';
import { WalletService } from './wallets.service';

@Controller('fun')
export class WalletController {
  constructor(private walletService: WalletService) {}

  @Get()
  async findAll() {
    return this.walletService.findAll();
  }
}
