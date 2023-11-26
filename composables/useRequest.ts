import { defu } from 'defu'
import Cookies from 'js-cookie'

// TODO: 这里有一点BUG，这样自定义Fetch会造成，在生成的useRequest中使用请求钩子onRequest会对这里的函数进行覆盖
function _useRequest(...args: Parameters<typeof useFetch>) {
  const [request, opts] = args
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Cache-Control': 'no-cache',
  }

  const def: typeof opts = {
    headers,
    onRequest() {
      useSystemStore().isLoading = true
    },
    onResponse() {
      useSystemStore().isLoading = false
    },
    onResponseError({ response }) {
      // 处理登录后的鉴权失败的响应
      if (import.meta.client && response.status === 401 && useRoute().path !== '/login') {
        Cookies.remove('Authorization')
        autoRoute()
      }
    },
  }
  return useFetch(request, defu(opts, def))
}

export const useRequest = _useRequest as typeof useFetch
