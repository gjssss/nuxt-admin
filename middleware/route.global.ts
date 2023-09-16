export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    if (to.path !== '/login') {
      return navigateTo({
        path: '/login',
        query: {
          redirect: from.fullPath,
        },
      }, { replace: true })
    }
  }
  else if (process.client) {
    if (to.path !== '/login') {
      const tabsStore = useTabsStore()

      if (!tabsStore.hasTab(to.path))
        tabsStore.pushTabs(to.path)
    }
  }
})
