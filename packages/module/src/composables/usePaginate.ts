import { isArray } from 'lodash-es'
import type { Ref, WatchStopHandle } from 'vue'
import { ref, toValue, watchEffect } from 'vue'

export function usePaginate<T>(source: sourceFunc<T> | Array<T>, params?: Ref<any> | any): resolvePage<T> {
  const data = ref<Array<T>>() as Ref<T[]>
  const currentPage = ref<number>(1)
  const pageCount = ref<number>(1)
  const pageSize = ref<number>(10)

  async function next() {
    if (currentPage.value < pageCount.value)
      currentPage.value++
  }
  async function prev() {
    if (currentPage.value > 1)
      currentPage.value--
  }

  if (isArray(source)) {
    const close = watchEffect(() => {
      data.value = source.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value)
    })
    pageCount.value = source.length
    return {
      data,
      currentPage,
      pageCount,
      pageSize,
      refresh: async () => { },
      next,
      prev,

      close,
    }
  }
  else {
    const refresh = () => source(currentPage.value, pageSize.value, params ? toValue(params) : undefined)
      .then(({ data: _d, totalCount }) => {
        data.value = _d
        pageCount.value = totalCount
      })

    const close = watchEffect(refresh)
    return {
      data,
      currentPage,
      pageCount,
      pageSize,
      refresh,
      next,
      prev,

      close,
    }
  }
}

export type sourceFunc<T> = (page?: number, pageSize?: number, searchParams?: any) => Promise<{
  data: Array<T>
  totalCount: number
  page: number
  pageSize: number
}>

interface resolvePage<T> {
  data: Ref<Array<T>>
  currentPage: Ref<number>
  pageCount: Ref<number>
  pageSize: Ref<number>

  refresh: () => Promise<void>
  next: () => Promise<void>
  prev: () => Promise<void>

  close: WatchStopHandle
}
