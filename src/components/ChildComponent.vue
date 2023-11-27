<script lang="ts" setup>
import type { WatchStopHandle } from 'vue'
import { onBeforeUnmount, onUnmounted, watch, watchEffect } from 'vue'

const props = defineProps({
  message: String,
  visible: {
    type: Boolean,
    default: true
  }
})

onBeforeUnmount(() => {
  console.log('Child Component onBeforeUnmount')
})

onUnmounted(() => {
  console.log('Child Component onUnmounted')
})

// this one will be automatically stopped
watchEffect(() => {})

// 自动停止的 watchEffect
watch(
  () => props.visible,
  (newVal) => {
    console.log('watchEffect triggered')
    if (newVal === false) {
      stopObserving()
    }
  }
)

let stopWatchEffect: WatchStopHandle | null = null // 用于存储停止函数

// 不会自动停止的 watchEffect
setTimeout(() => {
  stopWatchEffect = watchEffect(() => {
    console.log("I'm not going to stop about message: ", props.message)
  })
}, 1000)

// 停止观察函数
function stopObserving() {
  if (stopWatchEffect) {
    stopWatchEffect()
    stopWatchEffect = null
    console.log('watchEffect stopped')
  }
}
</script>
<template>
  <div>
    <h1>Child Component</h1>
    <p>Message from parent: {{ message }}</p>
  </div>
</template>