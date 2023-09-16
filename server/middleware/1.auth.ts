export default defineEventHandler(async (event) => {
  if (event.context.matchedRoute?.path !== '/api/login')
    event.context.auth = true
})
