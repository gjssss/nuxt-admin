<script setup lang="ts">
import { isString } from 'lodash-es'
import type { optionsObj, tableProps } from './interface'

const props = withDefaults(defineProps<tableProps>(), {
  pagination: true,
})

defineSlots<{
  [key: string]: (row: any, column: any, $index: number) => any
}>()

const controlPanel = ref<string>('')

const {
  data,
  currentPage,
  pageCount,
  pageSize,
  refresh,
  close,
} = usePaginate(props.data)
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

function toggleSearch() {
  controlPanel.value = controlPanel.value ? '' : 'control'
}
onUnmounted(() => {
  close()
})
</script>

<template>
  <div>
    <!-- TODO: 按钮多种样式的颜色修改 -->
    <div class="flex justify-end">
      <el-button-group>
        <el-button @click="refresh()">
          刷新
        </el-button>
        <!-- TODO: 表搜索模块 -->
        <el-button @click="toggleSearch()">
          搜索
        </el-button>
      </el-button-group>
    </div>
    <el-collapse v-model="controlPanel" accordion class="search-collapse">
      <el-collapse-item name="control">
        <template #default>
          <div>
            Search Buidling 🚧
          </div>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-table :data="data" table-layout="auto" class="mt4">
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
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <div v-if="pagination" class="flex-center mt-20px">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        background
        hide-on-single-page
        layout="sizes, prev, pager, next,jumper, ->, total"
        :total="pageCount"
        :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
  </div>
</template>

<style lang="scss">
.search-collapse{
  &.el-collapse, .el-collapse-item__wrap{
    border: none;
  }
  .el-collapse-item__header{
    height: 0;
    border: none;
  }
  .el-collapse-item__arrow{
    display: none;
  }
}
</style>
