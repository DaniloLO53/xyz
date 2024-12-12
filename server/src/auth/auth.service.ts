/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UsersService } from 'src/users/users.service';
import crypto from 'crypto';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import * as schema from '../drizzle/schema/schema';
import { and, eq, gte } from 'drizzle-orm';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { RefreshTokenDto } from 'src/users/dto/refreshToken.dto';
import refreshJwtConfig from './config/refreshJwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @Inject(DRIZZLE) private readonly db: DrizzleDB,
    @Inject(refreshJwtConfig.KEY)
    private readonly refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
  ) {}
  async signIn({ email, password }: CreateUserDto) {
    const [existingUser] = await this.userService.findUserByEmail(email);

    if (!existingUser) {
      throw new HttpException("Incorrect user's data", HttpStatus.UNAUTHORIZED);
    }
    const passwordIsValid = this.validPassword(
      password,
      existingUser.password,
      existingUser.salt,
    );

    if (passwordIsValid) {
      const userId = existingUser.id.toString();
      const { refreshToken, accessToken } =
        await this.generateUserTokens(userId);
      const hashedRefreshToken = await argon2.hash(refreshToken);

      await this.storeRefreshToken({
        refreshToken: hashedRefreshToken,
        userId,
      });

      return { id: userId, refreshToken, accessToken };
    }
    throw new HttpException("Incorrect user's data", HttpStatus.UNAUTHORIZED);
  }

  async generateUserTokens(userId: string) {
    const config = this.refreshTokenConfig;
    const refreshToken = this.jwtService.sign({ userId }, config);
    const accessToken = this.jwtService.sign({ userId });

    return { accessToken, refreshToken };
  }

  async validateRefreshToken(userId: number, refreshToken: string) {
    const refreshTokenInfo = await this.getRefreshTokenInfoByUserId(
      userId.toString(),
    );

    if (!refreshTokenInfo || !refreshTokenInfo.refreshToken)
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);

    const refreshTokenMatches = await argon2.verify(
      refreshTokenInfo.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches)
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);

    return { id: userId };
  }

  async getRefreshTokenInfoByUserId(userId: string) {
    const refreshTokensSchema = schema.refreshTokens;
    const { userId: dbUserId, expiryDate } = refreshTokensSchema;
    const now = new Date() as unknown as string; // work around

    const [refreshTokenInfo] = await this.db
      .select()
      .from(schema.refreshTokens)
      .where(and(eq(dbUserId, userId), gte(expiryDate, now)));

    if (!refreshTokenInfo) {
      throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
    }

    return refreshTokenInfo;
  }

  async refreshTokens(userId: string) {
    const { accessToken, refreshToken } = await this.generateUserTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.updateRefreshToken({ refreshToken: hashedRefreshToken, userId });

    return { id: userId, refreshToken, accessToken };
  }

  async updateRefreshToken({ refreshToken, userId }: RefreshTokenDto) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.db
      .update(schema.refreshTokens)
      .set({
        userId,
        expiryDate,
        refreshToken,
      } as unknown as typeof schema.refreshTokens.$inferInsert)
      .where(eq(schema.refreshTokens.userId, userId)); //work around
  }

  async storeRefreshToken({ refreshToken, userId }: RefreshTokenDto) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.db.insert(schema.refreshTokens).values({
      userId,
      expiryDate,
      refreshToken,
    } as unknown as typeof schema.refreshTokens.$inferInsert); //work around
  }

  async deleteRefreshToken(userId: string) {
    return await this.db
      .delete(schema.refreshTokens)
      .where(eq(schema.refreshTokens.userId, userId));
  }

  validPassword(password: string, hash: string, salt: string) {
    const checkHash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return hash === checkHash;
  }
}
