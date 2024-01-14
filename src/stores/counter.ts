import { ref, computed, type Ref, type ComputedRef } from 'vue'
import { defineStore } from 'pinia'

interface CounterStore {
  count: Ref<number>
  doubleCount: ComputedRef<number>
  increment: () => void
}

export const useCounterStore = defineStore('counter', (): CounterStore => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment(): void {
    count.value++
  }

  return { count, doubleCount, increment }
})
