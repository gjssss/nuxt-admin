import type { MySql2Database } from 'drizzle-orm/mysql2'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '~/server/db'

let _db: MySql2Database<typeof schema>
export async function useDB() {
  if (!_db)
    _db = drizzle(await mysql.createConnection('mysql://root:123123123@localhost:3306/test'), { schema, mode: 'default' })
  return _db
}
