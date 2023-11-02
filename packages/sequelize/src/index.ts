import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule({
  meta: {
    name: 'nuxt-sequelize',
  },
  setup(options, nuxt) {
    nuxt.hook('modules:done', () => {
      console.log('My module is ready with current test option: ')
    })
  },
})
