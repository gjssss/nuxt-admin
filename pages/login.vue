<script setup lang="ts">
import Cookies from 'js-cookie'

onBeforeMount(async () => {
  // 在登录页首先检查Cookie是否正确，而后正确的跳转页面
  const { error } = await useRequest('/api/whoami')
  if (error)
    Cookies.remove('Authorization')
  else
    autoRoute(Cookies.get('Authorization'))
})

const formData = ref({
  userName: '',
  password: '',
})
async function submit() {
  try {
    await useRequest('/api/login', {
      body: formData.value,
      method: 'post',
    })
    autoRoute(Cookies.get('Authorization'))
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
