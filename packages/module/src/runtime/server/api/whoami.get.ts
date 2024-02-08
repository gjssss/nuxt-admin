export default defineEventHandler(async (event) => {
  return event.context.info.userName as string
})
