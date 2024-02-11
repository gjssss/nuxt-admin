import { defu } from 'defu'
import { useFetch, useNuxtApp, useSystemStore } from '#imports'

// 在这里控制请求默认配置
function defaultOpt<T>(): T {
  const app = useNuxtApp()
  return buildOpt({
    onRequest() {
      useSystemStore().isLoading = true
    },
    async onResponse(arg) {
      await app.callHook('admin:onResponse', arg)
      useSystemStore().isLoading = false
    },
    async onResponseError(arg) {
      await app.callHook('admin:onResponseError', arg)
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

export const useRequest: typeof useFetch = _useRequest as typeof useFetch
export const $request: typeof $fetch = _request as typeof $fetch
