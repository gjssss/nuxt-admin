<script setup lang="ts">
const systemStore = useSystemStore()
onMounted(() => {
  watchEffect(() => {
    for (const [key, value] of Object.entries(systemStore.color))
      document.documentElement.style.setProperty(`--${key}`, value)
  })
})
</script>

<template>
  <div h-full w-full>
    <slot />
  </div>
</template>

<style>

</style>
