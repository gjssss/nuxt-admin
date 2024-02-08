import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TabsPaneContext } from 'element-plus'
import { useRoute, useRouter, useSystemStore } from '#imports'

export interface TabsItem {
  name: string
  path: string
}
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    list: [] as TabsItem[],
  }),
  actions: {
    /**
     * 添加tab
     * @param path 页面路径
     */
    pushTabs(path: string) {
      const info = useSystemStore().findPageInfoFromPath(path)
      if (info)
        this.list.push({ name: info.title, path: info.path })
    },
    /**
     * 点击Tab的时候触发
     * @param ctx Element Plus Tabs上下文
     */
    routeTab(ctx: TabsPaneContext) {
      const router = useRouter()
      router.push(ctx.props.name as string)
    },
    /**
     * 是否存在某个Tab
     * @param path 路径
     * @returns True: 存在Tab
     */
    hasTab(path: string) {
      return this.list.findIndex(item => item.path === path) >= 0
    },
    /**
     * 关闭一个tab
     * @param path 关闭路径
     */
    closeTab(path: string) {
      const index = this.list.findIndex(item => item.path === path)

      if (index >= 0)
        this.list.splice(index, 1)

      const router = useRouter()

      if (this.list.length === 0) {
        const route = useRoute()
        if (route.path === '/')
          this.pushTabs('/')
        else
          router.push('/')
      }
      else {
        router.push((this.list[index] ?? this.list[this.list.length - 1]).path)
      }
    },
    /**
     * 关闭所有
     */
    closeAll() {
      this.list.splice(0)
      const router = useRouter()
      const route = useRoute()

      if (route.path === '/')
        this.pushTabs('/')
      else
        router.push('/')
    },
    /**
     * 关闭其他
     */
    closeOther(path: string) {
      const index = this.list.findIndex(item => item.path === path)
      if (index >= 0) {
        const item = this.list[index]
        this.list.splice(0)
        this.list.push(item)
        const router = useRouter()
        router.push(item.path)
      }
    },
  },
  getters: {
    tabs: (state) => {
      return state.list.map(item => ({ name: item.name, key: item.path }))
    },
    activeTab: () => {
      const route = useRoute()
      return route.path
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useTabsStore, import.meta.hot))
