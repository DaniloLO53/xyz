import { pgTable, serial, text, date } from 'drizzle-orm/pg-core';

export const refreshTokens = pgTable('refresh_tokens', {
  id: serial('id').primaryKey(),
  refreshToken: text('refresh_token').notNull(),
  userId: text('user_id').notNull(),
  expiryDate: date('expiryDate').notNull(),
});
