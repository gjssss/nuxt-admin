<script setup lang="tsx" generic="T">
import { isString } from 'lodash-es'
import type { optionsObj, tableProps } from './interface'

defineProps<tableProps<T>>()

defineSlots<{
  [key: string]: (row: any, column: any, $index: number) => any
}>()

/**
 * 正确的获取和转化不同的formatter为element plus所需类型
 * @param f options的formatter函数
 */
function formatter(f: optionsObj['formatter']) {
  if (f) {
    return (row: any, column: any, cellValue: any, index: number) => {
      if (f.length === 1)
        return f(cellValue)
      else
        return f(row, column, cellValue, index)
    }
  }
}
</script>

<template>
  <el-table :data="data" table-layout="auto">
    <template
      v-for="item in options"
      :key="isString(item) ? item : item.column"
    >
      <el-table-column
        :prop="isString(item) ? item : item.column"
        :label="isString(item) ? item : item.label ?? item.column"
        :formatter="isString(item) ? undefined : formatter(item.formatter)"
        align="center"
      >
        <template
          v-if="$slots[isString(item) ? item : item.column]"
          #default="scope"
        >
          <slot :name="isString(item) ? item : item.column" v-bind="scope" />
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style>

</style>
