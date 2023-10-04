<script setup lang="ts">
defineProps<{
  size: string
  stop?: boolean
}>()
const systemStore = useSystemStore()
</script>

<template>
  <div class="container" :class="systemStore.theme ? 'is-active' : ''" @click="stop ? () => {} : systemStore.toggleTheme()">
    <Icon name="i-carbon-moon" class="moon" />
    <Icon name="i-carbon-sun" class="sun" />
  </div>
</template>

<style scoped>
/*------ Settings ------*/
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  cursor: pointer;
  font-size: v-bind(size);
  user-select: none;
}

.container .moon {
  position: absolute;
  animation: keyframes-fill .5s;
}

.container .sun {
  position: absolute;
  display: none;
  animation: keyframes-fill .5s;
}

/* ------ On check event ------ */
.container.is-active .moon {
  display: none;
}

.container.is-active .sun {
  display: block;
}

/* ------ Hide the default checkbox ------ */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* ------ Animation ------ */
@keyframes keyframes-fill {
  0% {
    transform: rotate(-360deg) scale(0);
    opacity: 0;
  }

  75% {
    transform: rotate(25deg);
  }
}
</style>
