<script setup lang="ts">
const systemStore = useSystemStore()

onMounted(() => {
  watchEffect(() => {
    (['light', 'dark'] as ('light' | 'dark')[]).forEach((item) => {
      document.documentElement.style.setProperty(`--${item}-color`, systemStore.color[item])
      document.documentElement.style.setProperty(`--${item}-color-bg`, changeAlpha(systemStore.color[item], 0.1))
    })
  })
  systemStore.isClient = true
})
</script>

<template>
  <div h-full w-full>
    <div v-if="!systemStore.isClient" class="flex-center h-full w-full">
      <CommonLoading />
    </div>
    <ClientOnly>
      <slot />
    </ClientOnly>
  </div>
</template>

<style></style>
