import { Module } from '@nestjs/common';
import { WalletController } from './wallets.controller';

@Module({
  controllers: [WalletController],
  providers: [],
})
export class WalletModule {}
