export function testAuth(Storage: Storage) {
  const auth = Storage.getItem('Authorization')
  if (auth) {
    const route = useRoute()
    if (route.query.redirect && typeof route.query.redirect === 'string' && !route.query.redirect.startsWith('/login'))
      return navigateTo(route.query.redirect)
    return navigateTo('/')
  }
}
