import { acceptHMRUpdate, defineStore } from 'pinia'
import type { menuOptionItem, pathInfoItem } from '~/types'

export const useSystemStore = defineStore('system', () => {
  const color = ref({
    'main-deep': '#342070',
    'main-primary': '#5d3ebd',
    'main-flat': '#e0deeb',
    'main-contrast': '#f5cf39',
    'main-soft': '#ffeb9b',
    'sub-deep': '#1e1e1e',
    'sub-primary': '#9b9b9b',
    'sub-flat': '#f2f2f2',
    'bas-positive': '#000000',
    'bas-nagative': '#ffffff',
    'transparent': 'transparent',
  })
  const webTitle = ref('Nuxt Admin')
  const collapse = ref(false)
  const footer = ref('2023 © Nuxt-Admin By GJSSSS.')
  const isClient = ref(false)
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
    color,
    webTitle,
    collapse,
    footer,
    isClient,
    menuOption,
    findPageInfoFromPath,
    pageInfo,
    pagePathArray,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
