import type { Config } from 'drizzle-kit';

import { env } from '~/utils/env.utils';

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  driver: 'mysql2',
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
} satisfies Config;
