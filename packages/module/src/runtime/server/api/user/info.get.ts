import { student } from '../../db/student'

export default defineEventHandler(async () => {
  return await withPagination(student, {
    where: true,
  })
})
