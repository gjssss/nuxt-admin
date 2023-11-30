export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('beforeResponse', (event, body) => {
    if (event.path.startsWith('/api/') && body?.body) {
      body.body = formatResData(body.body, {
        mode: event.context.mode,
        msg: event.context.msg,
      })
    }
  })
})
