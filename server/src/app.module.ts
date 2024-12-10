import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletModule } from './wallets/wallets.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    DrizzleModule,
    WalletModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
