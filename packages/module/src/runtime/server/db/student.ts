import { date, int, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core'

export const student = mysqlTable('student', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  sex: varchar('sex', { length: 6 }),
  address: varchar('address', { length: 256 }),
  telephone: varchar('telephone', { length: 256 }),
  age: int('age'),
  birthday: date('birthday'),
  email: varchar('email', { length: 256 }),
})
