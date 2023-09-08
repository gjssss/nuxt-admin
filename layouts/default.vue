<script setup lang="ts">
const systemStore = useSystemStore()

onMounted(() => {
  watchEffect(() => {
    for (const [key, value] of Object.entries(systemStore.color))
      document.documentElement.style.setProperty(`--${key}`, value)
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
