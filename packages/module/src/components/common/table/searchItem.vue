<script setup lang="ts">
import type { searchOption } from './interface'

defineProps<{
  params: searchOption
  label: string
}>()
const value = defineModel<string | number | boolean>()
</script>

<template>
  <div class="flex">
    <div class="flex-center mx-4 text-nowrap">
      {{ label }}
    </div>
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
  </div>
</template>

<style>

</style>
