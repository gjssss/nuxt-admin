import { addComponentsDir, addImportsDir, addPlugin, addServerScanDir, createResolver, defineNuxtModule, installModule } from '@nuxt/kit'
import type { FetchContext, FetchResponse } from 'ofetch'
import type { requestOption } from './runtime/client/composables/useRequest'

export interface ModuleOptions {
  server?: boolean

}

export interface ModuleHooks {
}

export interface RuntimeModuleHooks {
  'admin:onResponse': (context: FetchContext & {
    response: FetchResponse<ResponseType>
  }) => Promise<void> | void
  'admin:onResponseError': (context: FetchContext & {
    response: FetchResponse<ResponseType>
  }) => Promise<void> | void
}

export interface ModulePublicRuntimeConfig {
  client?: {
    request?: requestOption
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-admin',
    configKey: 'nuxtAdmin',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    server: true,
  },

  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`

    addPlugin(resolver.resolve('./runtime/client/plugins/nprogress'))
    addPlugin(resolver.resolve('./runtime/client/plugins/middleware'))
    addComponentsDir({
      path: resolver.resolve('./components'),
    })
    addImportsDir(resolver.resolve('./runtime/client/utils'))
    addImportsDir(resolver.resolve('./runtime/client/composables'))

    if (options.server) {
      addServerScanDir(resolver.resolve('./runtime/server'))
      addPlugin(resolver.resolve('./runtime/client/plugins/request'))
    }

    nuxt.options.css.push(resolver.resolve('./styles/index.css'))

    await installModule(await resolver.resolvePath('@vueuse/nuxt'))
    await installModule(await resolver.resolvePath('@unocss/nuxt'))
    await installModule(await resolver.resolvePath('@pinia/nuxt'))
    await installModule(await resolver.resolvePath('@nuxtjs/color-mode'))
    await installModule(await resolver.resolvePath('@element-plus/nuxt'))
    await installModule(await resolver.resolvePath('nuxt-icon'))
  },
})

declare module '#app' {
  interface RuntimeNuxtHooks extends RuntimeModuleHooks {}
}
