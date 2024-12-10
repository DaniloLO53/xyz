import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletModule } from './wallets/wallets.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    DrizzleModule,
    WalletModule,
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
