import { User } from '~/models'

export default defineEventHandler(async () => {
  await User.sync()
  return 'hello'
})
