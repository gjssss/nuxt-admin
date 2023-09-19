<script setup lang="ts">
onBeforeMount(() => {
  testAuth(localStorage)
})

const formData = ref({
  userName: '',
  password: '',
})
async function submit() {
  try {
    const { data } = await useReq('/api/login', {
      body: formData.value,
      method: 'post',
    })
    localStorage.setItem('Authorization', data!.token)
    testAuth(localStorage)
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
