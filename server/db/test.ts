import { date, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const test = mysqlTable('test', {
  id: serial('id').primaryKey(),
  date: date('date'),
  name: varchar('name', { length: 256 }),
  address: varchar('address', { length: 256 }),
})
