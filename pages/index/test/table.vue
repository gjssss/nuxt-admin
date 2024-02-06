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
    search: {
      type: 'select',
      options: [
        {
          value: '',
          label: '全部',
        },
        {
          value: '男',
          label: '男',
        },
        {
          value: '女',
          label: '女',
        },
      ],
      default: '',
    },
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
async function fetchData(page = 1, pageSize = 10, searchParams: any) {
  const params: Record<string, any> = {
    page,
    pageSize,
  }
  if (searchParams.sex)
    params.sex = searchParams.sex

  return await $request('/api/user/info', {
    params,
  })
}
const dialogVisible = ref(false)
</script>

<template>
  <div class="card h-full w-full">
    <CommonTable :data="fetchData" :options="option">
      <template #option>
        <el-button type="info">
          详情
        </el-button>
        <el-button type="danger">
          拒绝
        </el-button>
      </template>
    </CommonTable>
  </div>
  <CommonTableDialog v-model="dialogVisible" data="123" title="123" />
</template>

<style></style>
