<script lang="ts" setup>
import { reactive, ref, watch, watchEffect, watchPostEffect } from 'vue'
import ChildComponent from '@/components/ChildComponent.vue'

// 定义一个接口来描述 API 响应的结构
interface YesNoResponse {
  answer: string
  // 如果还有其他字段，也可以在这里定义
}

interface UserInfo {
  userId: number
  id: number
  title: string
  completed: boolean
}

const question = ref<string>('') // 假设 question 是一个响应式引用
const answer = ref<string | null>(null) // 明确指定 answer 的类型为 string 或 null
const loading = ref<boolean>(false) // 明确指定 loading 的类型为 boolean

const x = ref(0)
const y = ref(0)

const obj = reactive({ count: 0 })

const todoId = ref(1)
const data = ref(null)

const inputValue = ref('')
const processedByWatch = ref('')
const processedByWatchEffect = ref('')
const processedByWatchPostEffect = ref('')
const visible = ref(true)
const childComponentMessage = ref('')

const email = ref('')
const emailError = ref('')

const userInfo = ref<UserInfo | null>(null)

const searchQuery = ref('')
const isSearchEnabled = ref(false)

watch(question, async (newQuestion) => {
  if (newQuestion.includes('?')) {
    loading.value = true
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      const data: YesNoResponse = await res.json() // 使用接口来断言数据类型
      answer.value = data.answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    } finally {
      loading.value = false
    }
  }
})

// single ref
watch(
  x,
  (newX) => {
    console.log(`x is ${newX}`)
    obj.count++
  },
  { immediate: true }
)

// getter
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})

// instead, use a getter:
watch(
  () => obj.count,
  (count) => {
    console.log(`count is: ${count}`)
  },
  { deep: true }
)

watchEffect(async (callBack) => {
  console.log('111')
  // 触发异步操作
  await fetchData()

  callBack(() => {
    console.log('222')
  })
})

// 使用 'watch' 来观察 'inputValue' 的变化，并设置 flush 为 'post'
watch(
  inputValue,
  (newVal) => {
    // 这个回调会在 DOM 更新后执行
    processedByWatch.value = `watch (post): ${newVal.toUpperCase()}`
  },
  { flush: 'post' }
)

// 使用 'watchEffect' 直接观察副作用，并设置 flush 为 'post'
watchEffect(
  () => {
    // 这个回调会在关联的响应式依赖变化后的 DOM 更新后执行
    processedByWatchEffect.value = `watchEffect (post): ${inputValue.value.toLowerCase()}`
  },
  { flush: 'post' }
)

watchPostEffect(() => {
  processedByWatchPostEffect.value = `watchPostEffect: ${inputValue.value.toLowerCase()}`
})

async function fetchData() {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`)
  data.value = await response.json()
  return data.value
}

// 表单输入验证
watch(email, (newVal) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(newVal)) {
    emailError.value = 'Please enter a valid email.'
  } else {
    emailError.value = ''
  }
})

fetchData().then((data) => {
  userInfo.value = data
})

// 依赖于异步数据的 UI 更新
watchEffect(() => {
  if (userInfo.value) {
    console.log('User info updated:', userInfo.value)
  }
})

// 条件性监视逻辑
watch(isSearchEnabled, () => {
  if (isSearchEnabled.value && searchQuery.value.length > 3) {
    console.log('Searching for:', searchQuery.value)
  }
  isSearchEnabled.value = false
})

const performSearch = () => {
  isSearchEnabled.value = true
}
</script>
<template>
  <div>
    <p>Ask a yes/no question:</p>
    <input v-model="question" :disabled="loading" />
    <p>{{ answer }}</p>

    <br />
    x: <input v-model.number="x" type="number" /> <br />
    y: <input v-model.number="y" type="number" />
    <p>x: {{ x }}</p>
    <p>y: {{ y }}</p>
    <p>obj.count: {{ obj.count }}</p>
    <br />
    <input v-model.number="todoId" type="number" /> <br />
    <p>todoId: {{ todoId }}</p>
    <p>data: {{ data }}</p>

    <div>
      <h1>Callback Flush Timing</h1>
      <input v-model="inputValue" placeholder="Type here" />
      <p>Input Value: {{ inputValue }}</p>
      <p>Processed Value with watch (post): {{ processedByWatch }}</p>
      <p>Processed Value with watchEffect (post): {{ processedByWatchEffect }}</p>
      <p>Processed Value with watchPostEffect: {{ processedByWatchPostEffect }}</p>
      <input v-model="childComponentMessage" placeholder="Type here" />
      <ChildComponent v-show="visible" :message="childComponentMessage" :visible="visible" />
      <button @click="visible = !visible">Toggle Child Component</button>
    </div>

    <div>
      <!-- 表单输入验证 -->
      <input v-model="email" placeholder="Enter your email" />
      <p v-if="emailError">{{ emailError }}</p>
    </div>

    <div>
      <!-- 依赖于异步数据的 UI 更新 -->
      <div v-if="userInfo">
        <p>User Id: {{ userInfo.userId }}</p>
        <p>Title: {{ userInfo.title }}</p>
      </div>
    </div>

    <div>
      <!-- 条件性监视逻辑 -->
      <input v-model="searchQuery" placeholder="Search" />
      <button @click="performSearch">Search</button>
    </div>
  </div>
</template>