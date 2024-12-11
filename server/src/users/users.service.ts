import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { CreateUserDto } from './dto/createUser.dto';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { UpdateUserDto } from './dto/updateUser.dto';
import * as schema from '../drizzle/schema/schema';
import { RefreshTokenDto } from './dto/refreshToken.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createUser({ email, password }: CreateUserDto) {
    const [existentUser] = await this.findUserByEmail(email);

    if (existentUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const { salt, hash } = this.hashPassword(password);
    return await this.db.insert(schema.users).values({
      email,
      password: hash,
      salt,
    } as typeof schema.users.$inferInsert); //work around to fix inference error due to default value for "salt" at user's table;
  }

  async updateUser({ email, password, id }: UpdateUserDto) {
    const [existentUser] = await this.findUserById(Number(id));

    if (!existentUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const { salt, hash } = this.hashPassword(password);
    return await this.db
      .update(schema.users)
      .set({ email, password: hash, salt } as typeof schema.users.$inferInsert); //work around to fix inference error due to default value for "salt" at user's table
  }

  async deleteUser(id: string) {
    const [existentUser] = await this.findUserById(Number(id));

    if (!existentUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.db
      .delete(schema.users)
      .where(eq(schema.users.id, Number(id)));
  }

  async storeRefreshToken({ token, sub }: RefreshTokenDto) {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);
    await this.db.insert(schema.refreshTokens).values({
      sub,
      expiryDate,
      token,
    } as unknown as typeof schema.refreshTokens.$inferInsert); //work around
  }

  hashPassword(password: string) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return { salt, hash };
  }

  async findUserByEmail(email: string) {
    return await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
  }

  async findUserById(id: number) {
    return await this.db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
  }
}
