<script setup lang="tsx">
import { storeToRefs } from 'pinia'

const systemStore = useSystemStore()
onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.setProperty('--el-menu-active-bg-color', changeAlpha(systemStore.color['main-primary'], 0.1))
  })
})
const { collapse } = storeToRefs(systemStore)
const _collapse = ref(collapse.value)

interface menuOptionItem {
  title: string
  key: string | number
  icon?: string
  children?: menuOptionItem[]
}
const moption: menuOptionItem[] = [
  {
    title: 'test 1',
    key: '1',
    icon: 'i-carbon-home',
    children: [
      {
        title: 'test 1-1',
        key: '1-1',
      },
      {
        title: 'test 1-2',
        key: '1-2',
      },
      {
        title: 'test 1-3',
        key: '1-3',
      },
    ],
  },
  {
    title: 'test 2',
    key: '2',
    icon: 'i-carbon-home',
  },
  {
    title: 'test 3',
    key: '3',
    icon: 'i-carbon-home',
  },
  {
    title: 'test 4',
    key: '4',
    icon: 'i-carbon-home',
  },
]

function sidebarMenu(props: { option: menuOptionItem[] }) {
  const _map = (item: menuOptionItem) => {
    if (item.children) {
      return <el-sub-menu index={item.key}>
        {{
          title: () => <>
            <el-icon><div class={item.icon ?? 'i-carbon-home'} /></el-icon>
            <span>{item.title}</span>
          </>,
          default: () => item.children?.map(_map),
        }}
      </el-sub-menu>
    }
    else {
      return <el-menu-item index={item.key}>
        {{
          default: () => <el-icon><div class={item.icon ?? 'i-carbon-home'} /></el-icon>,
          title: () => <>{item.title}</>,
        }}
      </el-menu-item>
    }
  }

  return props.option.map(_map)
}

const menuStyle = computed(() => ({
  '--el-menu-active-color': 'var(--main-deep)',
}))

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
  <layoutDefault>
    <div class="h-full w-full flex">
      <div class="flex-0 border-style h-full">
        <el-menu default-active="2" :style="menuStyle" :collapse="collapse" class="h-full w-210px">
          <div class="flex-center h-55px" :class="_collapse ? 'w-63px' : 'w-full'">
            <img class="h-30px" src="/nuxt.svg" alt="Nuxt Logo" :class="_collapse ? '' : 'mr-10px'">
            <div v-show="!_collapse" class="text-22px font-bold">
              {{ systemStore.webTitle }}
            </div>
          </div>
          <sidebarMenu :option="moption" />
        </el-menu>
      </div>
      <div class="flex flex-1 flex-col">
        <div class="border-style h-55px flex flex-shrink-0 items-center border-b">
          <ElButton text size="large" class="ml-10px" @click="CollapseHandle()">
            <div class="i-carbon-collapse-categories text-16pxs" />
          </ElButton>
        </div>
        <main class="box-border flex-1 bg-#eee p-10px">
          <slot />
        </main>
        <footer class="h-30px bg-white text-center">
          <ElLink :underline="false" type="info">
            {{ systemStore.footer }}
          </ElLink>
        </footer>
      </div>
    </div>
  </layoutDefault>
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
