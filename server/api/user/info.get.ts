import { Test } from '~/models'
import { formatResData } from '~/utils/format'
import { paginate } from '~/utils/pagination'

export default defineEventHandler(async () => {
  const data = await paginate(Test)
  return formatResData({
    data: data.rows.map(i => i.toJSON()),
    totalCount: data.count,
    page: 0,
    limit: 10,
  })
})
