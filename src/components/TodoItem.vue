<script lang="ts" setup>
// 定义 props 的类型
type Props = {
  title: string;
}
const props = defineProps<Props>()

// 定义 emits
const emit = defineEmits(['remove'])
</script>

<template>
  <li>
    {{ props.title }}
    <button @click="emit('remove')">Remove</button>
  </li>
</template>