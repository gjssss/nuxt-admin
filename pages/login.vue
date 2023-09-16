<script setup lang="ts">
onBeforeMount(() => {
  const auth = localStorage.getItem('Authorization')
  if (auth) {
    const route = useRoute()
    if (route.query.redirect && typeof route.query.redirect === 'string' && !route.query.redirect.startsWith('/login'))
      return navigateTo(route.query.redirect)
    return navigateTo('/')
  }
})
</script>

<template>
  <div>
    123
  </div>
</template>

<style>

</style>
