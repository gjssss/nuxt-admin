export default defineEventHandler(async () => {
  await sleep(500)
  return formatResData(await paginate('test'))
})
