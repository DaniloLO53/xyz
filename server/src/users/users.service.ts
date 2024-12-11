import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from '../drizzle/drizzle.module';
import { users } from '../drizzle/schema/users.schema';
import { DrizzleDB } from '../drizzle/types/drizzle';
import { CreateUserDto } from './dto/createUser.dto';
import { eq } from 'drizzle-orm';
import crypto from 'crypto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async createUser({ email, password }: CreateUserDto) {
    const [existentUser] = await this.findUserByEmail(email);

    if (existentUser) {
      throw new HttpException('User already exists', HttpStatus.CONFLICT);
    }

    const { hash } = this.hashPassword(password);
    return await this.db.insert(users).values({ email, password: hash });
  }

  async updateUser({ email, password, id }: UpdateUserDto) {
    const [existentUser] = await this.findUserById(Number(id));

    if (!existentUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    const { hash } = this.hashPassword(password);
    return await this.db.update(users).set({ email, password: hash });
  }

  async deleteUser(id: string) {
    const [existentUser] = await this.findUserById(Number(id));

    if (!existentUser) {
      throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
    }

    return await this.db.delete(users).where(eq(users.id, Number(id)));
  }

  hashPassword(password: string) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return { salt, hash };
  }

  //   validPassword(password, hash, salt) {
  //     const checkHash = crypto
  //       .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
  //       .toString('hex');
  //     return hash === checkHash;
  //   }

  async findUserByEmail(email: string) {
    return await this.db.select().from(users).where(eq(users.email, email));
  }

  async findUserById(id: number) {
    return await this.db.select().from(users).where(eq(users.id, id));
  }
}
