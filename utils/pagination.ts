import type { FindAndCountOptions, FindOptions, Model, ModelStatic } from 'sequelize'

export async function paginate<T extends ModelStatic<any>>(
  model: T,
  options?: FindOptions & FindAndCountOptions,
): Promise<{
  rows: Model<T>[]
  count: number
}> {
  const event = useEvent()
  const query = getQuery(event)
  const page = Number(query.page ?? 1)
  const pageSize = Number(query.pageSize ?? 10)
  const offset = (page - 1) * pageSize
  const limit = pageSize

  const result = await model.findAndCountAll({
    ...options,
    offset,
    limit,
  })

  return { rows: result.rows, count: result.count }
}
