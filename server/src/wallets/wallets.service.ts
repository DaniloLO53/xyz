import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE } from 'src/drizzle/drizzle.module';
import { DrizzleDB } from 'src/drizzle/types/drizzle';
import { CreateWalletDto } from './dto/createWallet.dto';
import * as schema from '../drizzle/schema/schema';
import { UpdateWalletDto } from './dto/updateWallet.dto';
import { and, eq } from 'drizzle-orm';

@Injectable()
export class WalletService {
  constructor(@Inject(DRIZZLE) private db: DrizzleDB) {}

  async findAll() {
    return await this.db.select().from(schema.wallets);
  }

  async create(userId: string, { name }: CreateWalletDto) {
    return await this.db.insert(schema.wallets).values({ name, userId });
  }

  async update(
    userId: string,
    { name, walletId }: UpdateWalletDto & { walletId: string },
  ) {
    return await this.db
      .update(schema.wallets)
      .set({ name })
      .where(
        and(
          eq(schema.wallets.userId, Number(userId)),
          eq(schema.wallets.id, Number(walletId)),
        ),
      );
  }
}
