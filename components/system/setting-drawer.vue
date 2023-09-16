<script setup lang="ts">
const value = defineModel<boolean>()
</script>

<template>
  <ElDrawer v-model="value" title="设置">
    <div class="flex flex-col">
      <el-divider>
        数据库
      </el-divider>
    </div>
  </ElDrawer>
</template>

<style>

</style>
