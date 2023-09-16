import { sha256 } from 'ohash'
import { User } from '~/models'

export default defineEventHandler(async () => {
  await User.sync()
  const admin = User.build({
    userName: 'admin',
    password: sha256('123123'),
  })
  await admin.save()
  return 'hello'
})
