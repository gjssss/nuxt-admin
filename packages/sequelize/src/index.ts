import { addServerPlugin, addTemplate, addTypeTemplate, createResolver, defineNuxtModule, resolveFiles } from '@nuxt/kit'
import { genArrayFromRaw, genImport, genSafeVariableName } from 'knitwork'
import defu from 'defu'
import { getNameFromPath } from './utils/path'

export default defineNuxtModule({
  meta: {
    name: '#nuxt/sequelize',
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    // const modelFiles = await resolveFiles(nuxt.options.srcDir, 'model/*')
    // const appModels = modelFiles.map(path => ({
    //   name: getNameFromPath(path),
    //   path,
    // }))

    // virtual imports
    nuxt.hook('nitro:config', (_config) => {
      _config.alias = _config.alias || {}

      // Inline module runtime in Nitro bundle
      _config.externals = defu(typeof _config.externals === 'object' ? _config.externals : {}, {
        inline: [resolve('./runtime/service')],
      })
      _config.alias['#nuxt/sequelize'] = resolve('./runtime/service')

      if (_config.imports) {
        _config.imports.dirs = _config.imports.dirs || []
        _config.imports.dirs?.push('model')
      }
    })

    addTypeTemplate({
      filename: 'types/nuxt-sequelize.d.ts',
      getContents: () => [
        'declare module \'#nuxt/sequelize\' {',
        `  const defineSequelizeModel: typeof import('${resolve('./runtime/service')}').defineSequelizeModel`,
        '}',
      ].join('\n'),
    })

    // addTemplate({
    //   filename: 'model.mjs',
    //   getContents: () => [
    //     ...appModels.map(item =>
    //       genImport(item.path, genSafeVariableName(item.name)),
    //     ),
    //   `export const mysqlModels = ${genArrayFromRaw(appModels.map(item => genSafeVariableName(item.name)))}`,
    //   ].join('\n'),
    // })
  },
})
