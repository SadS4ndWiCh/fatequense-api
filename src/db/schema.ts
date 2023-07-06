import { mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const students = mysqlTable('students', {
  id: varchar('id', { length: 13 }).primaryKey(),
  photoUrl: varchar('photoUrl', { length: 255 }),
});
