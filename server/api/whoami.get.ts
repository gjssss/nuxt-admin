export default defineEventHandler(async (event) => {
  return formatResData({
    userName: event.context.info.userName,
  })
})
