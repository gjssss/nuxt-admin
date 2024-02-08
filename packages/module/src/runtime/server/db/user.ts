import { mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const user = mysqlTable('user', {
  id: serial('id').primaryKey(),
  userName: varchar('userName', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
})
