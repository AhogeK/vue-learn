<script lang="ts" setup>
import { onBeforeUnmount, onUnmounted, ref, watch, watchEffect, type WatchStopHandle } from 'vue'
import HomeComponent from '@/components/HomeComponent.vue'
import PostsComponent from '@/components/PostsComponent.vue'
import ArchiveComponent from '@/components/ArchiveComponent.vue'

const props = defineProps({
  message: String,
  visible: {
    type: Boolean,
    default: true
  }
})

type TabName = keyof typeof tabs

const currentTab = ref<TabName>('HomeComponent')
const tabs = {
  HomeComponent,
  PostsComponent,
  ArchiveComponent
}

const emit = defineEmits(['change-message'])

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

// Compiler macros, such as defineExpose, don't need to be imported
defineExpose({
  stopObserving
})
</script>
<template>
  <div>
    <!--<h1 @click="$emit('changeMessage')">Child Component</h1>-->
    <h1 @click="emit('change-message')">Child Component</h1>
    <p>Message from parent: {{ message }}</p>
    <div class="demo">
      <button
        v-for="(_, tab) in tabs"
        :key="tab"
        :class="['tab-button', { active: currentTab === tab }]"
        @click="currentTab = tab"
      >
        {{ tab }}
      </button>
      <component :is="tabs[currentTab]" class="tab" />
    </div>
  </div>
</template>