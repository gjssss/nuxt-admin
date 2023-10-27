import { Test } from '~/models'
import { formatResData } from '~/utils/format'
import { paginate } from '~/utils/pagination'
import { sleep } from '@/utils/debug'

export default defineEventHandler(async () => {
  const data = await paginate(Test)
  // 避免请求太快不显示loading
  await sleep(500)
  return formatResData({
    data: data.rows.map(i => i.toJSON()),
    totalCount: data.count,
    page: 0,
    limit: 10,
  })
})
