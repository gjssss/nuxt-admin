<script setup lang="ts">
// const data = await useRequest('/api/user/info')
// const option2 = ['id', 'name', 'option']
const option2 = defineTableOption([
  {
    column: 'id',
  },
  {
    column: 'name',
    label: '用户名',
  },
  {
    column: 'address',
    label: '家庭住址',
  },
  {
    column: 'date',
    formatter: (value) => {
      return new Date(value).toLocaleDateString()
    },
    label: '日期',
  },
  {
    column: 'option',
    label: '操作',
  },
])
async function fetchData(page = 1, pageSize = 10) {
  return await $request('/api/user/info', {
    params: {
      page,
      pageSize,
    },
  })
}
</script>

<template>
  <div class="card h-full w-full">
    <!-- <CommonTable :data="data.data" :options="option2"> -->
    <CommonTable :data="fetchData" :options="option2">
      <template #option>
        <el-button>确认</el-button>
        <el-button>取消</el-button>
      </template>
    </CommonTable>
  </div>
</template>

<style>

</style>
