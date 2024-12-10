import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
});

export const wallets = pgTable('wallets', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').references(() => users.id),
});
