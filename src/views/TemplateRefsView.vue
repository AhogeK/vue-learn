<script lang="ts" setup>
import { onMounted, ref, watchEffect } from 'vue'
import ChildComponent from '@/components/ChildComponent.vue'

const input = ref<HTMLInputElement | null>(null)

const list = ref<string[]>(['a', 'b', 'c'])
const itemRefs = ref<(HTMLLIElement | null)[]>([])

const child = ref<InstanceType<typeof ChildComponent> | null>(null)

onMounted(() => {
  // input.value.focus()
  console.log(itemRefs.value)
  console.log(child.value)
})

watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // not mounted yet, or the element was unmounted (e.g. by v-if)
  }
})
</script>
<template>
  <div>
    <input ref="input" />
    <ul>
      <li v-for="(item, index) in list" :key="index" ref="itemRefs">
        {{ item }}
      </li>
    </ul>
    <input
      :ref="
        (el) => {
          /* assign el to a property or ref */
        }
      "
    />
    <ChildComponent ref="child" message="Hello World" />
  </div>
</template>