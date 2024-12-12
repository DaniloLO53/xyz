import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';
import refreshJwtConfig from './config/refreshJwt.config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, RefreshStrategy],
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    PassportModule,
    UsersModule,
    DrizzleModule,
    ConfigModule.forFeature(refreshJwtConfig),
  ],
})
export class AuthModule {}
