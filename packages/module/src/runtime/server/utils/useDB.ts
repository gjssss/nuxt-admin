/* eslint-disable node/prefer-global/process */
import type { MySql2Database } from 'drizzle-orm/mysql2'
import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
import * as schema from '../db'

let _db: MySql2Database<typeof schema>
export async function useDB() {
  if (!process.env.DB_URL)
    throw new Error('No Database URL')
  if (!_db)
    _db = drizzle(await mysql.createConnection(process.env.DB_URL), { schema, mode: 'default' })
  return _db
}
