<script setup lang="ts">

</script>

<template>
  <div>
    <AdminLayoutLogin>
      <template #default="{ formData, submit }">
        <AdminLogin v-model:user-name="formData.userName" v-model:password="formData.password" @login="submit" />
      </template>
    </AdminLayoutLogin>
  </div>
</template>

<style>

</style>
