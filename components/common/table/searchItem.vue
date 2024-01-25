<script setup lang="ts">
import type { searchOption } from './interface'

defineProps<{
  params: searchOption
}>()
const value = defineModel<string | number | boolean>()
</script>

<template>
  <el-select
    v-if="params.type === 'select'"
    v-model="value"
  >
    <el-option
      v-for="item in params.options"
      :key="item.value.toString()"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<style>

</style>
