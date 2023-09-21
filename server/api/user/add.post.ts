import { User } from '~/models'
import { formatResData } from '~/utils/format'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const u = User.build({
    name: body.name,
  })
  await u.save()
  return formatResData(null, 'create')
})
