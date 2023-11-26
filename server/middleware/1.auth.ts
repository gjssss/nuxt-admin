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
        return formatResData(null, {
          mode: 'unAuth',
          msg: `令牌错误`,
        })
      }
    }
    else {
      return formatResData(null, {
        mode: 'unAuth',
        msg: '请先登录',
      })
    }
  }
})
