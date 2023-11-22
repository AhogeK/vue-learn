<script lang="ts" setup>
import { onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref } from 'vue'
import ChildComponent from '@/components/ChildComponent.vue'

const message = ref('')
const showMessage = ref(true)
const timer = ref<number | null>(null)

onBeforeMount(() => {
  console.log('onBeforeMount')
})

onMounted(() => {
  console.log('onMounted')
  timer.value = setTimeout(() => {
    showMessage.value = false
  }, 1000)
  message.value = 'Hello, Vue 3!'
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})

onUpdated(() => {
  console.log('onUpdated')
})
</script>
<template>
  <ChildComponent v-if="showMessage" :message="message" />
</template>