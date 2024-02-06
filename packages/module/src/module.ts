import { addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

export interface ModuleOptions {
  apiKey: string
}

export interface ModuleHooks {
  'my-module:init': any
}

export interface ModuleRuntimeHooks {
  'my-module:runtime-hook': any
}

export interface ModulePublicRuntimeConfig {
  NAME: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-admin',
    configKey: 'nuxtAdmin',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    apiKey: 'test',
  },
  // eslint-disable-next-line unused-imports/no-unused-vars
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/nprogress.ts'))
  },
})
