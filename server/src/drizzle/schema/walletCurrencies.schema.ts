import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { wallets } from './wallets.schema';

export const walletCurrencies = pgTable('wallet_currencies', {
  id: serial('id').primaryKey(),
  wallet_id: integer('wallet_id').references(() => wallets.id),
  currency: text('currency').notNull(),
});
