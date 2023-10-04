<script setup lang="ts">
const route = useRoute()
</script>

<template>
  <div class="card full">
    <code>{{ route.path }}</code> 路径不存在
  </div>
</template>
