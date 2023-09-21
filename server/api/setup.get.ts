import { sha256 } from 'ohash'
import { Test, User } from '~/models'

export default defineEventHandler(async () => {
  await User.sync({ force: true })
  await Test.sync({ force: true })

  const admin = User.build({
    userName: 'admin',
    password: sha256('123123'),
  })
  await admin.save()

  await Test.build({
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
    date: new Date(),
  }).save()

  return '重置数据库'
})
