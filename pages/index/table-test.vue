<script setup lang="ts">
const data = await request('/api/user/info')
const options = defineTableProps(data.data!, [
  'id', 'name', 'date', 'address', 'createdAt',
])
// type t = FetchResult<, 'GET'>
</script>

<template>
  <div class="card h-full w-full">
    <!-- TODO: 获取url类型提示 -->
    <CommonTable method="get" url="/api/" />
  </div>
</template>

<style>

</style>
