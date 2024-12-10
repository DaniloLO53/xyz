import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletModule } from './wallets/wallets.module';

@Module({
  imports: [DrizzleModule, WalletModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
