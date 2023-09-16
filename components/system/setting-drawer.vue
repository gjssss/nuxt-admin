<script setup lang="ts">
const value = defineModel<boolean>()
async function test() {
  const data = await $fetch('/api/test')
  console.log(data)
}
</script>

<template>
  <ElDrawer v-model="value" title="设置">
    <div class="flex flex-col">
      <el-divider>
        数据库
      </el-divider>
      <el-button @click="test">
        测试
      </el-button>
    </div>
  </ElDrawer>
</template>

<style>

</style>
