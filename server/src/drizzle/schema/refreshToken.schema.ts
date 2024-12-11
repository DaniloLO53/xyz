import { pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  token: text('token').notNull(),
  sub: text('sub').notNull(),
  expiryDate: date('expiryDate').notNull(),
});
