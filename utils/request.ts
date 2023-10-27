import { defu } from 'defu'

function _request(...args: Parameters<typeof $fetch>): Promise<{
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

    else
      testAuth(localStorage)
    const option: typeof opts = defu({
      headers,
      onRequest() {
        // console.log('start')
        useSystemStore().isLoading = true
      },
      onResponse() {
        // console.log('end')
        useSystemStore().isLoading = false
      },
    } as typeof opts, opts)
    return $fetch(request, option)
  }
}
export const request = _request as typeof $fetch
