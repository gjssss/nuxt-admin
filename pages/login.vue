<script setup lang="ts">
onBeforeMount(() => {
  testAuth()
})

function testAuth() {
  const auth = localStorage.getItem('Authorization')
  if (auth) {
    const route = useRoute()
    if (route.query.redirect && typeof route.query.redirect === 'string' && !route.query.redirect.startsWith('/login'))
      return navigateTo(route.query.redirect)
    return navigateTo('/')
  }
}

const formData = ref({
  userName: '',
  password: '',
})
async function submit() {
  try {
    const { data } = await $fetch('/api/login', {
      body: formData.value,
      method: 'POST',
    })
    localStorage.setItem('Authorization', data!.token)
    testAuth()
  }
  catch (e) {
    // console.log(e)
  }
}
</script>

<template>
  <div>
    <div class="ma w-300px">
      <AdminLogin v-model:user-name="formData.userName" v-model:password="formData.password" @login="submit" />
    </div>
  </div>
</template>

<style>

</style>
