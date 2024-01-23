import type { SQL } from 'drizzle-orm'
import { sql } from 'drizzle-orm'
import type { MySqlTable, SelectedFields } from 'drizzle-orm/mysql-core'
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
    page,
    limit,
  }
}

export async function withPagination<T extends MySqlTable>(table: T, option?: {
  select?: SelectedFields
  query?: SQL
}) {
  const event = useEvent()
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const pageSize = Number(query.pageSize ?? 10)

  const db = await useDB()

  let selected
  if (option?.select)
    selected = db.select(option?.select)
  else
    selected = db.select()

  let qb
  if (option?.query)
    qb = selected.from(table).where(option?.query)
  else
    qb = selected.from(table)

  const data = await qb.limit(pageSize).offset((page - 1) * pageSize)

  const [{ count }] = await (
    option?.query
      ? db.select({
        count: sql<number>`COUNT (*)`,
      }).from(table).where(option?.query)
      : db.select({
        count: sql<number>`COUNT (*)`,
      }).from(table)
  )

  return {
    data,
    totalCount: count,
    page,
    pageSize,
  }
}
