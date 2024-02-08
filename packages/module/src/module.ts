import { fileURLToPath } from 'node:url'
import { addComponentsDir, addImportsDir, addPlugin, createResolver, defineNuxtModule, installModule, useNuxt } from '@nuxt/kit'

export interface ModuleOptions {
}

export interface ModuleHooks {
}

export interface ModuleRuntimeHooks {
}

export interface ModulePublicRuntimeConfig {
}

function rPath(p: string) {
  return fileURLToPath(new URL(p, import.meta.url).toString())
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-admin',
    configKey: 'nuxtAdmin',
  },
  // Default configuration options of the Nuxt module
  defaults: {
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`

    addPlugin(resolver.resolve('./runtime/client/plugins/nprogress'))
    addPlugin(resolver.resolve('./runtime/client/pluginsmiddleware'))
    addComponentsDir({
      path: rPath('./components'),
    })
    addImportsDir(rPath('./runtime/client/utils'))
    addImportsDir(rPath('./runtime/client/composables'))

    await installModule(await resolver.resolvePath('@vueuse/nuxt'))
    await installModule(await resolver.resolvePath('@unocss/nuxt'))
    await installModule(await resolver.resolvePath('@pinia/nuxt'))
    await installModule(await resolver.resolvePath('@nuxtjs/color-mode'))
    await installModule(await resolver.resolvePath('@element-plus/nuxt'))
    await installModule(await resolver.resolvePath('nuxt-icon'))
  },
})
