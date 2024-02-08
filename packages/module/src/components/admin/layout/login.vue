<script setup lang="ts">
import Cookies from 'js-cookie'
import { $request, autoRoute, notify, onMounted, ref, useNuxtData, useRequest, useRoute } from '#imports'

onMounted(async () => {
  try {
    const data = await $request('/api/whoami')
    autoRoute(Cookies.get('Authorization'))
    notify.success(`你好，${data ?? 'Unkown(你是怎么进来的 <.<)'}`, '登录成功')
    useNuxtData('username').data.value = data
  }
  catch (error) {
    Cookies.remove('Authorization')
  }
})
const route = useRoute()

const formData = ref({
  userName: route.query.userName?.toString() ?? '',
  password: route.query.password?.toString() ?? '',
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
      <slot v-bind="{ formData, submit }" />
    </div>
  </div>
</template>

<style>

</style>
