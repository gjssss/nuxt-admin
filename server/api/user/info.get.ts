export default defineEventHandler(async () => {
  return formatResData(await paginate('test'))
})
