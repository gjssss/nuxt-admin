/**
 * 测试是否持有登录令牌，如果有并且是在登录页面则跳转到首页或重定向页面，如果没有则跳转到登录页面并设置重定向参数
 * @param Storage 存储对象
 */
export function testAuth(Storage: Storage) {
  const route = useRoute()
  const auth = Storage.getItem('Authorization')
  if (auth) {
    if (route.path.startsWith('/login')) { // 只有登录页才执行跳转首页操作，目的是自动登录
      if (
        route.query.redirect // 如果有重定向参数
      && typeof route.query.redirect === 'string' // 并且重定向参数是个字符串
      && !route.query.redirect.startsWith('/login') // 并且重定向目的地不是登录页面
      )
        return navigateTo(route.query.redirect)
      return navigateTo('/')
    }
  }
  else {
    if (route.path !== '/login') {
      return navigateTo({
        path: '/login',
        query: {
          redirect: route.fullPath,
        },
      }, { replace: true })
    }
  }
}
