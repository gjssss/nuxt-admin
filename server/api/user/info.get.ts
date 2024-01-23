import { student } from '~/server/db'

export default defineEventHandler(async () => {
  return await withPagination(student, {
    where: true,
  })
})
