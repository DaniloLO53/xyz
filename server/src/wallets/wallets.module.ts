import { Module } from '@nestjs/common';
import { WalletController } from './wallets.controller';
import { WalletService } from './wallets.service';
import { DrizzleModule } from 'src/drizzle/drizzle.module';

@Module({
  controllers: [WalletController],
  providers: [WalletService],
  imports: [DrizzleModule],
})
export class WalletModule {}
