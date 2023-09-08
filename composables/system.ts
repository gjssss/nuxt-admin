import { acceptHMRUpdate, defineStore } from 'pinia'
import type { menuOptionItem } from '~/types'

export const useSystemStore = defineStore('system', {
  state: () => ({
    color: {
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
    },
    webTitle: 'Nuxt Admin',
    collapse: false,
    footer: '2023 © Nuxt-Admin By GJSSSS.',
    isClient: false,
    menuOption: [
      {
        title: '首页',
        key: 'index',
        icon: 'i-carbon-home',
      },
      {
        title: '用户',
        key: 'user',
        icon: 'i-carbon-home',
      },
      {
        title: '测试',
        key: 'other',
        icon: 'i-carbon-home',
      },
    ] as menuOptionItem[],
  }),
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useSystemStore, import.meta.hot))
