<script setup lang="tsx">
import { storeToRefs } from 'pinia'
import type { menuOptionItem } from '~/types'

const systemStore = useSystemStore()
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
function sidebarMenu(props: { option: menuOptionItem[] }) {
  /**
   * 用于递归的辅助map函数
   * @param rootPath 根路径，即正在遍历的数组的跟组件的key
   */
  function _map(rootPath: string) {
    /**
     * 用于生成路由路径，忽略index
     * @param root 根路径
     * @param end 端点路径
     */
    function processPath(root: string, end: string) {
      const arr: string[] = []
      if (root && root !== 'index')
        arr.push(root)

      if (end && end !== 'index')
        arr.push(end)
      return `/${arr.join('/')}`
    }

    /**
     * 辅助函数
     */
    return (item: menuOptionItem) => {
      if (item.children) {
        // 如果有children，就嵌套在sub menu中继续递归
        // 可以发现如果有sub menu的情况下，下面语句会渲染多次，可能是需要对菜单折叠起来后的弹出菜单也进行渲染
        // 不是函数优化问题
        return <el-sub-menu index={processPath(rootPath, String(item.key))}>
        {{
          title: () => <>
            <el-icon><div class={item.icon ?? 'i-carbon-home'} /></el-icon>
            <span>{item.title}</span>
          </>,
          default: () => item.children?.map(_map(String(item.key))),
        }}
      </el-sub-menu>
      }
      else {
        // 如果没有就渲染item
        return <el-menu-item index={ processPath(rootPath, String(item.key))}>
        {{
          default: () => <el-icon><div class={item.icon ?? 'i-carbon-home'} /></el-icon>,
          title: () => <>{item.title}</>,
        }}
      </el-menu-item>
      }
    }
  }

  return props.option.map(_map(''))
}

const menuStyle = computed(() => ({
  '--el-menu-active-color': 'var(--main-deep)',
}))

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
    <div class="flex-0 border-style h-full">
      <el-menu :default-active="$route.path" :style="menuStyle" :collapse="collapse" class="h-full w-210px" router>
        <div class="flex-center h-55px" :class="_collapse ? 'w-63px' : 'w-full'">
          <img class="h-30px" src="/nuxt.svg" alt="Nuxt Logo" :class="_collapse ? '' : 'mr-10px'">
          <div v-show="!_collapse" class="text-22px font-bold">
            {{ systemStore.webTitle }}
          </div>
        </div>
        <sidebarMenu :option="systemStore.menuOption" />
      </el-menu>
    </div>
    <div class="flex flex-1 flex-col">
      <div class="border-style h-55px flex flex-shrink-0 items-center border-b">
        <CommonBackIcon size="20px" class="ml-10px rotate-180" :select="!collapse" @click="CollapseHandle()" />
      </div>
      <main class="box-border flex-1 bg-#eee p-10px">
        <NuxtPage />
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
.el-menu-item {
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: var(--transparent);
  }

  &.is-active {
    background-color: var(--el-menu-active-bg-color);

    &::after {
      background-color: var(--main-primary);
    }
  }
}

.el-menu--collapse .el-sub-menu.is-active {
  background-color: var(--el-menu-active-bg-color);
}
</style>
