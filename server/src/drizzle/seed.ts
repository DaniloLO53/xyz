import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema/schema';
import 'dotenv/config';
import { faker } from '@faker-js/faker';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});
const db = drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;

async function main() {
  const userIds = await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const user = await db
          .insert(schema.users)
          .values({
            email: faker.internet.email(),
            password: faker.internet.password(),
            salt: faker.internet.password(),
          } as typeof schema.users.$inferInsert) //work around to fix inference error due to default value for "salt" at user's table
          .returning();

        return user[0].id;
      }),
  );

  await Promise.all(
    Array(50)
      .fill('')
      .map(async () => {
        const wallet = await db
          .insert(schema.wallets)
          .values({
            user_id: faker.helpers.arrayElement(userIds),
          })
          .returning();

        return wallet[0].id;
      }),
  );
}

main()
  .then()
  .catch((err) => {
    console.error(err);
    process.exit(0);
  });
