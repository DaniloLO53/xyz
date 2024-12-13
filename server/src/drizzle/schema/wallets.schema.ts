import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  name: text('name').notNull().default('portfolio'),
});
