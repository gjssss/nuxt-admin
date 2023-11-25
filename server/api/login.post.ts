import { sha256 } from 'ohash'
import jwt from 'jsonwebtoken'
import type { ResDataType } from '~/server/utils/format'

interface resType {
  token: string
}

export default defineEventHandler(async (event): Promise<ResDataType<resType | null>> => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  let token: string = ''
  try {
    const db = await useDB()
    const user = await db.query.user.findFirst({
      where: (user, { eq, and }) => and(eq(user.userName, body.userName), eq(user.password, sha256(body.password))),
    })

    if (user) {
      token = jwt.sign({
        userName: user.userName,
        password: user.password,
      }, runtimeConfig.secret, runtimeConfig.tokenExpired ? { expiresIn: runtimeConfig.tokenExpired } : { })
    }
    else {
      setResponseStatus(event, 401, 'user is not existed')
      return formatResData(null, {
        mode: 'bad',
        msg: '用户不存在',
      })
    }
  }
  catch (e) {
    return formatResData(null, {
      mode: 'bad',
      msg: '登录失败',
    })
  }
  return formatResData({
    token,
  })
})
