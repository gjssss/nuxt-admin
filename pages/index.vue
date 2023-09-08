<script setup lang="ts">

</script>

<template>
  <div class="card flex-center h-full flex-col">
    <div class="logo relative" />
    <div class="whitespace-nowrap text-38px font-bold c-#006333">
      Welcom Nuxt Admin
    </div>
  </div>
</template>

<style lang="scss">
.logo {
  background-image: url(/nuxt.svg);
  background-size: 200px;
  width: 200px;
  height: 200px;
  position: relative;

  &::before {
    content: '';
    background-image: url(/nuxt.svg);
    background-size: 300px;
    width: 300px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 30%;
    transform: translate(-50%, -50%);
    filter: blur(20px) opacity(50%);
  }
}
</style>
