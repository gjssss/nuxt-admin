import { acceptHMRUpdate, defineStore } from 'pinia'
import type { menuOptionItem, pathInfoItem } from '~/types'

export const useSystemStore = defineStore('system', () => {
  // Element Plus 配置
  const language = ref('zh-cn')
  const size = ref<'small' | 'default' | 'large'>('default')

  // 主题颜色配置
  const color = ref({
    light: '#006333',
    dark: '#00DC82',
  })
  const theme = useDark({
    valueLight: 'light',
  })

  // 显示信息配置
  const webTitle = ref('Nuxt Admin')
  const footer = ref('2023 © Nuxt-Admin By GJSSSS.')

  // 状态变量
  const collapse = ref(false)
  const isClient = ref(false)
  const isLoading = ref(false)

  // 路由配置
  const menuOption = ref<menuOptionItem[]>([
    {
      title: '首页',
      key: 'index',
      icon: 'i-carbon-home',
    },
    {
      title: '表格测试',
      key: 'table-test',
      icon: 'i-carbon-table-split',
    },
    {
      title: '用户',
      key: 'user',
      icon: 'i-carbon-home',
    },
    {
      title: '测试1',
      key: 'other',
      icon: 'i-carbon-home',
      children: [
        {
          title: '测试2',
          key: 'other',
          icon: 'i-carbon-home',
        },
      ],
    },
  ])

  /**
   * 为每个路由页面计算path
   */
  const pageInfo = computed(() => {
    const _map = (root: string) => {
      return (item: menuOptionItem): pathInfoItem => (
        {
          title: item.title,
          key: item.key,
          icon: item.icon,
          path: mergePath(root, String(item.key)),
          children: item.children && item.children.length > 0 ? item.children.map(_map(String(item.key))) : undefined,
        }
      )
    }
    return menuOption.value.map(_map(''))
  })

  const toggleTheme = useToggle(theme)

  /**
   * 从页面路径返回页面详情信息
   * @param path 页面路径
   * @returns 页面信息
   */
  function findPageInfoFromPath(path: string) {
    for (const item of pageInfo.value) {
      if (item.path === path) {
        return item
      }
      else if (item.children && item.children.length > 0) {
        for (const child of item.children) {
          if (child.path === path)
            return child
        }
      }
    }
    return null
  }

  const pagePathArray = computed(() => {
    const path = useRoute().path
    if (path === '/')
      return []
    const pathArray = path.split('/')
    pathArray.shift()
    let arr: menuOptionItem[] | undefined = menuOption.value
    return pathArray.map((item) => {
      const node = arr!.find(i => i.key === item)!
      arr = node.children
      return node.title
    })
  })

  return {
    language,
    size,

    color,
    theme,

    webTitle,
    footer,

    collapse,
    isClient,
    isLoading,

    menuOption,

    toggleTheme,

    findPageInfoFromPath,
    pageInfo,
    pagePathArray,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
