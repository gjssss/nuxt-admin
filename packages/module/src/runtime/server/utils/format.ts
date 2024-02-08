export type HttpMode = 'success' | 'create' | 'silence' | 'bad' | 'unAuth' | 'notFount'

export function codeFromMode(mode: HttpMode) {
  switch (mode) {
    case 'success':
      return 200
    case 'create':
      return 201
    case 'silence':
      return 204
    case 'bad':
      return 400
    case 'unAuth':
      return 401
    case 'notFount':
      return 404
  }
}
interface formatResOption {
  mode?: HttpMode
  msg?: string
}

export interface ResDataType<T> {
  data?: T
  msg: string
}

function formatResData<T>(data: T | null): ResDataType<T>
function formatResData<T>(data: T | null, mode: HttpMode): ResDataType<T>
function formatResData<T>(data: T | null, option: formatResOption): ResDataType<T>
function formatResData<T>(data: T | null, option?: HttpMode | formatResOption) {
  const event = useEvent()
  const resData: ResDataType<T> = { msg: '' }
  if (typeof option === 'string') {
    setResponseStatus(event, codeFromMode(option), option)
    resData.msg = option
  }
  else if (typeof option === 'undefined') {
    setResponseStatus(event, codeFromMode('success'), 'success')
    resData.msg = 'success'
  }
  else {
    setResponseStatus(event, codeFromMode(option.mode ?? 'success'), option.msg ?? option.mode ?? 'success')
    resData.msg = option.msg ?? option.mode ?? 'success'
  }
  if (data)
    resData.data = data

  return resData
}

export { formatResData }
