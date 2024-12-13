import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateWalletDto } from './dto/createWallet.dto';
import * as schema from '../drizzle/schema/schema';

@Injectable()
export class WalletService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(schema.wallets);
  }

  async create(userId: string, { name }: CreateWalletDto) {
    return await this.db.insert(schema.wallets).values({ name, userId });
  }
}
