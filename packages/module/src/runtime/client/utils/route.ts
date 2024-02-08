import { navigateTo, useRoute } from '#imports'

/**
 * 用于控制正确的跳转
 * @param flag 是否通过鉴权
 */
export function autoRoute(flag?: string | undefined | boolean) {
  const route = useRoute()
  if (flag) {
    if (route.path.startsWith('/login')) { // 只有登录页才执行跳转首页操作，目的是自动登录
      if (
        route.query.redirect // 如果有重定向参数
        && typeof route.query.redirect === 'string' // 并且重定向参数是个字符串
        && !route.query.redirect.startsWith('/login') // 并且重定向目的地不是登录页面
      )
        navigateTo(route.query.redirect)
      else
        navigateTo('/')
    }
  }
  else {
    if (route.path !== '/login') {
      navigateTo({
        path: '/login',
        query: {
          redirect: route.fullPath,
        },
      }, { replace: true })
    }
  }
}
