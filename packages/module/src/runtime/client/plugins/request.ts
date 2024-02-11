import Cookies from 'js-cookie'
import { defineNuxtPlugin } from '#app'
import { autoRoute, useRoute } from '#imports'

export default defineNuxtPlugin((app) => {
  app.hook('admin:onResponse', (arg) => {
    arg.response._data = arg.response._data.data
  })
  app.hook('admin:onResponseError', (arg) => {
    // 处理登录后的鉴权失败的响应
    if (import.meta.client && arg.response.status === 401 && useRoute().path !== '/login') {
      Cookies.remove('Authorization')
      autoRoute()
    }
  })
})
