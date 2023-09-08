<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="full card">
    <code>{{ route.path }}</code> 路径不存在
  </div>
</template>
