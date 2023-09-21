import { Test } from '~/models'
import { formatResData } from '~/utils/format'

export default defineEventHandler(async () => {
  const data = await Test.findAll()
  return formatResData(data.map(i => i.toJSON()))
})
