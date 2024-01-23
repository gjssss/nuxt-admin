<script setup lang="ts">
const option = defineTableOption([
  {
    column: 'id',
  },
  {
    column: 'name',
    label: '用户名',
  },
  {
    column: 'sex',
    label: '性别',
  },
  {
    column: 'age',
    label: '年龄',
  },
  {
    column: 'address',
    label: '家庭住址',
  },
  {
    column: 'telephone',
    label: '电话',
  },
  {
    column: 'birthday',
    formatter: (value) => {
      return new Date(value).toLocaleDateString()
    },
    label: '日期',
  },
  {
    column: 'email',
    label: 'Email',
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
    <CommonTable :data="fetchData" :options="option">
      <template #option>
        <el-button type="success">
          确认
        </el-button>
        <el-button>取消</el-button>
      </template>
    </CommonTable>
  </div>
</template>

<style>

</style>
