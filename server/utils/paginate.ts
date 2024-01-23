import type { SQL } from 'drizzle-orm'
import { and, eq, sql } from 'drizzle-orm'
import type { MySqlTable, SelectedFields } from 'drizzle-orm/mysql-core'
import { isArray } from 'lodash-es'

export async function withPagination<T extends MySqlTable>(table: T, option?: {
  select?: SelectedFields
  where?: SQL | boolean | string[]
}) {
  const event = useEvent()
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const pageSize = Number(query.pageSize ?? 10)

  const db = await useDB()

  let selected
  if (option?.select)
    selected = db.select(option?.select).from(table)
  else
    selected = db.select().from(table)

  let querySQL: SQL<unknown> | undefined

  if (option?.where) {
    // where = true
    if (typeof option.where === 'boolean') {
      const columes = Object.keys(table)
      const _q = []
      for (const k in query) {
        if (k !== 'page' && k !== 'pageSize' && columes.includes(k))
          _q.push(eq((table as any)[k], query[k]))
      }
      querySQL = and(..._q)
    }

    // where = string[]
    else if (isArray(option.where)) {
      const columes = Object.keys(table)
      const _q = []

      for (const k of option.where) {
        if (k !== 'page' && k !== 'pageSize' && columes.includes(k))
          _q.push(eq((table as any)[k], query[k]))
      }
      querySQL = and(..._q)
    }

    else {
      querySQL = option.where
    }
  }

  const data = await (querySQL ? selected.where(querySQL) : selected)
    .limit(pageSize)
    .offset((page - 1) * pageSize)

  const [{ count }] = await (
    querySQL
      ? db.select({
        count: sql<number>`COUNT (*)`,
      }).from(table).where(querySQL)
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
