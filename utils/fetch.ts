import { merge } from 'lodash-es'

// TODO: 无法显示api返回类型
export function useReq(...args: Parameters<typeof $fetch>): Promise<{
  data: any
  msg: string
}> {
  if (process.server) {
    return $fetch(...args)
  }
  else {
    const [request, opts] = args

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Cache-Control': 'no-cache',
    }

    if (localStorage.getItem('Authorization'))
      headers.Authorization = localStorage.getItem('Authorization')!

    const option: typeof opts = merge({
      headers,
    }, opts)
    return $fetch(request, option)
  }
}
