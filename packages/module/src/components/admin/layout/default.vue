<script setup lang="ts">
import en from 'element-plus/es/locale/lang/en'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { computed, onMounted } from 'vue'
import { useSystemStore } from '../../../composables/system'

const systemStore = useSystemStore()
const locale = computed(() => {
  if (systemStore.language === 'zh-cn')
    return zhCn
  else if (systemStore.language === 'en')
    return en
  else return en
})

onMounted(() => {
  systemStore.isClient = true
})
</script>

<template>
  <div h-full w-full>
    <div v-if="!systemStore.isClient" class="flex-center h-full w-full">
      <CommonLoading />
    </div>
    <ClientOnly>
      <el-config-provider :locale="locale" :size="systemStore.size">
        <slot />
      </el-config-provider>
    </ClientOnly>
  </div>
</template>

<style></style>
