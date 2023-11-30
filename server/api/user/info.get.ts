export default defineEventHandler(async () => {
  await sleep(500)
  return await paginate('test')
})
