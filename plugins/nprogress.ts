import NProgress from 'nprogress'
import type { Router } from '#vue-router'

export default defineNuxtPlugin({
  name: 'nprogress',
  enforce: 'post',
  async setup(NuxtApp) {
    NProgress.configure({
      easing: 'ease', // 动画方式
      speed: 500, // 递增进度条的速度
      showSpinner: false, // 是否显示加载ico
      trickleSpeed: 200, // 自动递增间隔
      minimum: 0.3, // 初始化时的最小百分比
    })

    const router = NuxtApp.$router as Router
    router.beforeEach(() => {
      if (process.client)
        NProgress.start()
    })

    router.afterEach(() => {
      if (process.client)
        NProgress.done()
    })

    router.onError((error) => {
      if (process.client)
        NProgress.done()
      console.warn('路由错误', error.message)
    })
  },
})
