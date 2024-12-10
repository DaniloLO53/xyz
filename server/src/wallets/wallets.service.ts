import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { wallets } from 'src/drizzle/schema/wallets.schema';
import { DrizzleDB } from 'src/drizzle/types/drizzle';

@Injectable()
export class WalletService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(wallets);
  }
}
