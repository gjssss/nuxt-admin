import { sha256 } from 'ohash'
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
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
      event.context.mode = 'bad'
      event.context.msg = '用户不存在'
      return {}
    }
  }
  catch (e) {
    event.context.mode = 'bad'
    event.context.msg = '登录失败'
    return {}
  }
  setCookie(event, 'Authorization', token)
  return token
})
