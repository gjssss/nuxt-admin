<script setup lang="tsx">
import { storeToRefs } from 'pinia'
import { ElIcon, ElMenuItem, ElSubMenu } from 'element-plus'
import type { pathInfoItem } from '~/types'

const systemStore = useSystemStore()
const tabsStore = useTabsStore()
onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.setProperty('--el-menu-active-bg-color', changeAlpha(systemStore.color['main-primary'], 0.1))
  })
})
const { collapse } = storeToRefs(systemStore)
const _collapse = ref(collapse.value)

/**
 * 用于渲染菜单项
 * @param props 菜单项
 */
function sidebarMenu(props: { option: pathInfoItem[] }) {
  const _map = (item: pathInfoItem) =>
    item.children && item.children.length > 0
      ? <ElSubMenu index={item.path} popperClass='page-menu'>
        {{
          title: () => <>
            <ElIcon><div class={item.icon ?? 'i-carbon-home'} /></ElIcon>
            <span>{!collapse.value ? item.title : ''}</span>
          </>,
          default: () => item.children?.map(_map),
        }}
      </ElSubMenu>
      : <ElMenuItem index={item.path}>
        {{
          default: () => <ElIcon><div class={item.icon ?? 'i-carbon-home'} /></ElIcon>,
          title: () => <>{!collapse.value || item.key ? item.title : ''}</>,
        }}
      </ElMenuItem>
  return props.option.map(_map)
}

/**
 * 这里涉及到菜单折叠时标题的隐藏，问题在于：
 * 如果仅用一个变量`collapse`来控制折叠，就导致切换这个变量时首先被element plus捕获
 * 会首先开始菜单的收缩，在收缩过程中上方title会因为收缩被折叠
 * 解决方法：
 * 使用两个变量控制折叠，在折叠时首先将title隐藏，再收缩菜单栏；再展开时首先将菜单栏展开，再显示标题
 * 这样就能保证标题不被折叠
 */
function CollapseHandle(value?: boolean) {
  if (value === undefined) {
    if (_collapse.value) {
      collapse.value = false
      nextTick().then(() => {
        _collapse.value = false
      })
    }
    else {
      _collapse.value = true
      nextTick().then(() => {
        collapse.value = true
      })
    }
  }
  else {
    if (value) {
      collapse.value = false
      nextTick().then(() => {
        _collapse.value = false
      })
    }
    else {
      _collapse.value = true
      nextTick().then(() => {
        collapse.value = true
      })
    }
  }
}
</script>

<template>
  <div class="h-full w-full flex">
    <div class="border-style h-full flex-shrink-0">
      <el-menu :default-active="$route.path" :collapse="collapse" class="page-menu h-full w-210px flex flex-col" router>
        <div class="flex-center h-55px flex-shrink-0" :class="_collapse ? 'w-63px' : 'w-full'">
          <img class="h-30px" src="/nuxt.svg" alt="Nuxt Logo" :class="_collapse ? '' : 'mr-10px'">
          <div v-show="!_collapse" class="text-22px font-bold">
            {{ systemStore.webTitle }}
          </div>
        </div>
        <ElScrollbar>
          <sidebarMenu :option="systemStore.pageInfo" />
        </ElScrollbar>
      </el-menu>
    </div>
    <div class="min-w-0 flex flex-1 flex-col">
      <div class="h-100px flex-shrink-0">
        <div class="border-style box-border h-55px flex items-center border-b">
          <CommonBackIcon size="20px" class="ml-10px rotate-180" :select="!collapse" @click="CollapseHandle()" />
          <el-breadcrumb separator="/" class="page-breadcrumb ml-20px">
            <el-breadcrumb-item :to="{ path: '/' }">
              {{ systemStore.findPageInfoFromPath('/')?.title }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="item in systemStore.pagePathArray" :key="item">
              {{ item }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="border-style box-border h-45px border-b">
          <el-tabs :model-value="tabsStore.activeTab" type="card" closable class="page-tabs" @tab-click="tabsStore.routeTab" @tab-remove="tabsStore.closeTab">
            <ElScrollbar>
              <el-tab-pane v-for="item in tabsStore.tabs" :key="item.key" :label="item.name" :name="item.key" />
            </ElScrollbar>
          </el-tabs>
        </div>
      </div>
      <main class="box-border flex-1 bg-#eee p-10px">
        <NuxtPage keepalive />
      </main>
      <footer class="h-30px bg-white text-center">
        <ElLink :underline="false" type="info">
          {{ systemStore.footer }}
        </ElLink>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
.page-menu {
  --el-menu-active-color: var(--main-deep);

  .el-menu-item {
    position: relative;

    &.is-active {
      background-color: var(--el-menu-active-bg-color);

      &::after {
        content: '';
        position: absolute;
        left: 0;
        width: 5px;
        height: 100%;
        background-color: var(--main-primary);
      }
    }
  }

  &.el-menu--collapse .el-sub-menu.is-active {
    background-color: var(--el-menu-active-bg-color);
  }
}

.page-tabs {
  --el-color-primary: var(--el-color-black);

  &,
  .el-tabs__nav-wrap,
  .el-tabs__header,
  .el-tabs__nav-scroll,
  .el-tabs__nav,
  .el-tabs__item {

    height: 100%;
  }

  .el-tabs__nav.el-tabs__nav,
  .el-tabs__header,
  .el-tabs__item.el-tabs__item {
    border: none;
  }

  .el-tabs__header {
    margin: 0;
    padding: 0;
  }

  .el-tabs__item {
    position: relative;

    &.is-active::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      height: 2px;
      width: 100%;
      background-color: var(--main-primary);
    }
  }
}

.page-breadcrumb {
  --el-color-primary: var(--el-color-black);
}
</style>
