export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const tabsStore = useTabsStore()

    if (!tabsStore.hasTab(to.path))
      tabsStore.pushTabs(to.path)
  }
})
