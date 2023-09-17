import { sha256 } from 'ohash'
import jwt from 'jsonwebtoken'
import { User } from '~/models'
import type { ResDataType } from '~/utils/format'
import { formatResData } from '~/utils/format'

interface resType {
  token: string
}

export default defineEventHandler(async (event): Promise<ResDataType<resType | null>> => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  let token: string = ''
  try {
    const user = await User.findOne({
      where: {
        userName: body.userName,
        password: sha256(body.password),
      },
    })

    if (user) {
      token = jwt.sign({
        userName: user?.userName,
        password: user?.password,
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
