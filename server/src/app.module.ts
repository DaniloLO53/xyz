import { Module } from '@nestjs/common';
import { DrizzleModule } from './drizzle/drizzle.module';
import { WalletModule } from './wallets/wallets.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ExternalApiModule } from './externalApi/externalApi.module';

@Module({
  imports: [
    DrizzleModule,
    WalletModule,
    UsersModule,
    AuthModule,
    ExternalApiModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
