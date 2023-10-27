<script setup lang="ts">
withDefaults(defineProps<{
  /**
   * 图标大小
   */
  size: string
  /**
   * 是否选中
   */
  select: boolean
}>(), {
  size: '16px',
  select: false,
})
</script>

<template>
  <div class="buttons__burger" :style="{ '--size': size }" :class="{ active: select }">
    <span />
    <span />
    <span />
  </div>
</template>

<style scoped>
.buttons__burger {
  --size: 16px;
  --clr: var(--el-text-color-primary);
  width: var(--size);
  height: calc(0.7 * var(--size));
  cursor: pointer;
  position: relative;
  display: block;
}
.buttons__burger span {
  display: block;
  position: absolute;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid var(--clr);
  background-color: var(--clr);
  transition: 0.3s ease-in-out;
}

.buttons__burger span:nth-of-type(1) {
  top: 0;
  right: 0;
  transform-origin: right center;
}

.buttons__burger span:nth-of-type(2) {
  top: 50%;
  transform: translateY(-50%);
}

.buttons__burger span:nth-of-type(3) {
  top: 100%;
  right: 0;
  transform-origin: right center;
  transform: translateY(-100%);
}

.buttons__burger.active span:nth-of-type(1) {
  transform: translateY(-30%) rotate(40deg);
  width: 50%;
  top: 50%;
}

.buttons__burger.active span:nth-of-type(3) {
  transform: translateY(-70%) rotate(-40deg);
  width: 50%;
  top: 50%;
}
</style>
