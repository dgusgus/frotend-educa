<!-- src/App.vue -->
<script setup lang="ts">
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()
})
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style scoped>
/* Global app styles if needed */
#app {
  min-height: 100vh;
}
</style>