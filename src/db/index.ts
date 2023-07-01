import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';

import { env } from '~/utils/env.utils';

const connection = mysql.createPool({
  host: env.DATABASE_HOST,
  user: env.DATABASE_USER,
  password: env.DATABASE_PASS,
  database: env.DATABASE_NAME,
  multipleStatements: true,
});

export const db = drizzle(connection);

(async () => {
  await migrate(db, { migrationsFolder: './drizzle' });
})();
