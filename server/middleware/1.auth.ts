import jwt from 'jsonwebtoken'
import { formatResData } from '~/utils/format'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api') && event.path !== '/api/login') {
    const token = event.headers.get('Authorization')
    if (token) {
      const runtimeConfig = useRuntimeConfig()
      jwt.verify(token, runtimeConfig.secret, (err, decode) => {
        if (err) {
          return formatResData(null, {
            mode: 'unAuth',
            msg: `令牌错误：${err.message}`,
          })
        }
        else {
          event.context.info = decode
        }
      })
    }
    else {
      return formatResData(null, {
        mode: 'unAuth',
        msg: '请先登录',
      })
    }
  }
})
