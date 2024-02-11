import { defu } from 'defu'
import Cookies from 'js-cookie'
import { useNuxt } from '@nuxt/kit'
import { autoRoute, useSystemStore } from '#imports'
import { useFetch, useRoute } from '#app'

// 在这里控制请求默认配置
function defaultOpt<T>(): T {
  const { options } = useNuxt()
  return buildOpt({
    onRequest() {
      useSystemStore().isLoading = true
    },
    onResponse(arg) {
      useSystemStore().isLoading = false

      if (options.nuxtAdmin?.client?.request?.onResponse) {
        options.nuxtAdmin?.client?.request?.onResponse(arg)
      }
      else {
      // default
        // transform data structer
        arg.response._data = arg.response._data.data
      }
    },
    onResponseError(arg) {
      if (options.nuxtAdmin?.client?.request?.onResponseError) {
        options.nuxtAdmin?.client?.request?.onResponseError(arg)
      }
      else {
        // default
        // 处理登录后的鉴权失败的响应
        if (import.meta.client && arg.response.status === 401 && useRoute().path !== '/login') {
          Cookies.remove('Authorization')
          autoRoute()
        }
      }
    },
  }) as T
}

// TODO: 这里有一点BUG，这样自定义Fetch会造成，在生成的useRequest中使用请求钩子onRequest会对这里的函数进行覆盖
function _useRequest(...args: Parameters<typeof useFetch>) {
  const [request, opts] = args
  return useFetch(request, defu(opts, defaultOpt<typeof opts>()))
}

function _request(...args: Parameters<typeof $fetch>) {
  const [request, opts] = args
  return $fetch(request, defu(opts, defaultOpt<typeof opts>()))
}

/**
 * 构造option，提供编辑器智能提示
 */
function buildOpt(opt: requestOption) {
  return opt
}

export type requestOption = Parameters<typeof $fetch>[1]

export const useRequest = _useRequest as typeof useFetch
export const $request = _request as typeof $fetch
