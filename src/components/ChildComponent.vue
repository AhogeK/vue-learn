<script lang="ts" setup>
import { onBeforeUnmount, onUnmounted } from 'vue'

defineProps(['message'])

onBeforeUnmount(() => {
  console.log('Child Component onBeforeUnmount')
})

onUnmounted(() => {
  console.log('Child Component onUnmounted')
})
</script>
<template>
  <div>
    <h1>Child Component</h1>
    <p>Message from parent: {{ message }}</p>
  </div>
</template>