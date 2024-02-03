<script setup lang="ts">
import { cloneDeep, isString } from 'lodash-es'
import type { optionsObj, tableProps } from './interface'

const props = withDefaults(defineProps<tableProps>(), {
  pagination: true,
})

defineSlots<{
  [key: string]: (row: any, column: any, $index: number) => any
}>()

const controlPanel = ref<string>('')

const searchColumn = computed<Required<optionsObj>[]>(() => {
  if (typeof props.options[0] === 'string')
    return []
  else
    return props.options.filter(item => item.search) as Required<optionsObj>[] ?? []
})

const searchForm = ref<Record<string, string>>({})
const _searchForm = ref<Record<string, string>>({})

searchColumn.value.forEach((item) => {
  _searchForm.value[item.column] = String(item.search.default ?? '')
  searchForm.value[item.column] = String(item.search.default ?? '')
})

const {
  data,
  currentPage,
  pageCount,
  pageSize,
  refresh,
  close,
} = usePaginate(props.data, searchForm)

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

function comfirmSearch() {
  searchForm.value = cloneDeep(_searchForm.value)
}

onUnmounted(() => {
  close()
})
</script>

<template>
  <div>
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
          <div class="grid grid-cols-6 mt2">
            <common-table-search-item
              v-for="item, index in searchColumn"
              :key="index"
              v-model="_searchForm[item.column]" :params="item.search"
              :label="item.label"
            />
          </div>
          <el-button class="mt2" @click="comfirmSearch()">
            确认
          </el-button>
        </template>
      </el-collapse-item>
    </el-collapse>
    <el-table :data="data" table-layout="auto" class="mt4">
      <template v-for="item in options" :key="isString(item) ? item : item.column">
        <el-table-column
          :prop="isString(item) ? item : item.column"
          :label="isString(item) ? item : item.label ?? item.column"
          :formatter="isString(item) ? undefined : formatter(item.formatter)" align="center"
        >
          <template v-if="$slots[isString(item) ? item : item.column]" #default="scope">
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
        v-model:current-page="currentPage" v-model:page-size="pageSize" background hide-on-single-page
        layout="sizes, prev, pager, next,jumper, ->, total" :total="pageCount" :page-sizes="[10, 20, 30, 40, 50, 100]"
      />
    </div>
  </div>
</template>

<style lang="scss">
.search-collapse {

  &.el-collapse,
  .el-collapse-item__wrap {
    border: none;
  }

  .el-collapse-item__header {
    height: 0;
    border: none;
  }

  .el-collapse-item__arrow {
    display: none;
  }
}
</style>
