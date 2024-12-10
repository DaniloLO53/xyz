import { integer, pgTable, serial } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
});
