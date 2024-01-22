import { sql } from 'drizzle-orm'
import type { Tables } from './useQ'
import * as schema from '~/server/db'

export async function paginate<T extends Tables, U extends typeof schema[T]>(table: T) {
  const tableInstance = schema[table] as U

  const event = useEvent()
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const pageSize = Number(query.pageSize ?? 10)
  const offset = (page - 1) * pageSize
  const limit = pageSize
  const db = await useDB()
  const [{ count }] = await db.select({
    count: sql<number>`COUNT (*)`,
  }).from(tableInstance)
  const data = await db.select().from(tableInstance).limit(limit).offset(offset)
  return {
    data,
    totalCount: count,
    page: 0,
    limit: 10,
  }
}
