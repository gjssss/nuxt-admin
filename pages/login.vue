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
const formData = ref({
  userName: '',
  password: '',
})
async function submit() {
  const data = await $fetch('/api/login', {
    body: formData.value,
    method: 'POST',
  })
  console.log(data)
}
</script>

<template>
  <div>
    <div class="ma w-300px">
      <ElInput v-model="formData.userName" />
      <ElInput v-model="formData.password" type="password" />
      <ElButton @click="submit">
        Submit
      </ElButton>
    </div>
  </div>
</template>

<style>

</style>
