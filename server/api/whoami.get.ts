import { formatResData } from '~/utils/format'

export default defineEventHandler(async (event) => {
  return formatResData({
    userName: event.context.info.userName,
  })
})
