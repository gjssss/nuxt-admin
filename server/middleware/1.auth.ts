import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  if (event.path.startsWith('/api') && event.path !== '/api/login') {
    const token = getCookie(event, 'Authorization')
    if (token) {
      const runtimeConfig = useRuntimeConfig()
      try {
        event.context.info = jwt.verify(token, runtimeConfig.secret)
      }
      catch (error) {
        event.context.mode = 'unAuth'
        event.context.msg = '令牌错误'
        return {}
      }
    }
    else {
      event.context.mode = 'unAuth'
      event.context.msg = '请先登录'
      return {}
    }
  }
})
