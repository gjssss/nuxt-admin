<script setup lang="ts">
const data = await request('/api/user/info')
console.log(data.data)
</script>

<template>
  <div class="card h-full w-full">
    <CommonTable />
  </div>
</template>

<style>

</style>
