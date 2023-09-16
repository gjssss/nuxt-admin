import { sha256 } from 'ohash'
import jwt from 'jsonwebtoken'
import { User } from '~/models'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  let token: string
  try {
    const user = await User.findOne({
      where: {
        userName: body.userName,
        password: sha256(body.password),
      },
    })
    token = jwt.sign({
      userName: user?.userName,
      password: user?.password,
    }, runtimeConfig.secret, runtimeConfig.tokenExpired ? { expiresIn: runtimeConfig.tokenExpired } : { })
  }
  catch (e) {
    return {
      msg: '登录失败',
    }
  }
  return {
    token,
  }
})
