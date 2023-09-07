import { User } from '~/models'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const u = User.build({
    name: body.name,
  })
  await u.save()
  return {
    msg: 'yes',
  }
})
