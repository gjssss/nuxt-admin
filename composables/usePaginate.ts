import { isArray } from 'lodash-es'

export function usePaginate<T>(source: sourceFunc<T> | Array<T>): resolvePage<T> {
  const data = ref<Array<T>>() as globalThis.Ref<T[]>
  const currentPage = ref<number>(1)
  const pageCount = ref<number>(1)
  const pageSize = ref<number>(10)

  function next() {
    if (currentPage.value < pageCount.value)
      currentPage.value++
  }
  function prev() {
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
      refresh: () => {},
      next,
      prev,

      close,
    }
  }
  else {
    const _trigger = ref<boolean>(false)
    const close = watchEffect(() => {
      use(_trigger.value) // 手动触发effect
      source(currentPage.value, pageSize.value).then(({ data: _d, totalCount }) => {
        data.value = _d
        pageCount.value = totalCount
      })
    })
    return {
      data,
      currentPage,
      pageCount,
      pageSize,
      refresh: () => { _trigger.value = !_trigger.value },
      next,
      prev,

      close,
    }
  }
}

type sourceFunc<T> = (page?: number, pageSize?: number) => Promise<{
  data: Array<T>
  totalCount: number
  page: number
  limit: number
}>

interface resolvePage<T> {
  data: Ref<Array<T>>
  currentPage: Ref<number>
  pageCount: Ref<number>
  pageSize: Ref<number>

  refresh: Function
  next: Function
  prev: Function

  close: Function
}
