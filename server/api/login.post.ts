export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  return runtimeConfig.secret
})
