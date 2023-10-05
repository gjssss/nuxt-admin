<script setup lang="tsx" generic="T">
import { isString } from 'lodash-es'
import type { optionsObj, tableProps } from './interface'

const props = withDefaults(defineProps<tableProps<T>>(), {
  pagination: true,
})

defineSlots<{
  [key: string]: (row: any, column: any, $index: number) => any
}>()

const currentPage = ref(1)
const pageSize = ref(10)

const shownData = computed(() => {
  if (Array.isArray(props.data))
    return props.data.slice(pageSize.value * (currentPage.value - 1), pageSize.value * currentPage.value)
  else return []
})
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
  <div>
    <el-table :data="shownData" table-layout="auto">
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
    <div v-if="pagination" class="flex-center mt-20px">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        hide-on-single-page
        layout="sizes, prev, pager, next,jumper, ->, total"
        :total="Array.isArray(data) ? data.length : 1"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
  </div>
</template>

<style>

</style>
