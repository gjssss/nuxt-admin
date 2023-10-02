<script setup lang="tsx">
const data = await request('/api/user/info')
// const option1 = ['id', 'name']
const option2 = defineTableOption([
  {
    column: 'id',
  },
  {
    column: 'name',
  },
  {
    column: 'address',
  },
  {
    column: 'date',
    formatter: (value) => {
      return new Date(value).toLocaleDateString()
    },
  },
])
</script>

<template>
  <div class="card h-full w-full">
    <CommonTable :data="data.data" :options="option2" />
  </div>
</template>

<style>

</style>
