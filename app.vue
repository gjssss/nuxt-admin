<script setup lang="ts">
import { appName } from '~/constants'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'nprogress/nprogress.css'

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
