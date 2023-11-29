<script setup lang="ts">
import Cookies from 'js-cookie'

onMounted(async () => {
  try {
    const data = await $fetch('/api/whoami')
    autoRoute(Cookies.get('Authorization'))
    notify.success(`你好，${data.data?.userName ?? 'Unkown(你是怎么进来的 <.<)'}`, '登录成功')
  }
  catch (error) {
    Cookies.remove('Authorization')
  }
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
