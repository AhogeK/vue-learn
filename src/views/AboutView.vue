<script lang="ts" setup>
import { useCounterStore } from '@/stores/counter'
import { computed, onMounted, reactive, ref, watch } from 'vue'

const counter = useCounterStore()
const rawHtml = '<span style="color: red">This should be red.</span>'
const dynamicId = ref('')
const awesome = ref(true)
const typeText = ref('')
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])
const parentMessage = ref('Parent')
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'AhogeK',
  publishedAt: '2016-04-10'
})

const isActive = ref(true)

const aboutActiveClass = computed(() => ({
  active: isActive.value,
  hidden: !isActive.value
}))

// 当active为false是，1秒后变为true
watch(isActive, (value) => {
  console.log('isActive changed to:', value)
  if (!value) {
    setTimeout(() => {
      isActive.value = true
    }, 3000)
  }
})

items.value.forEach((item, index) => {
  console.log(parentMessage, item.message, index)
})

onMounted(() => {
  console.log('AboutView mounted')
})
</script>

<template>
  <div class="about" :class="aboutActiveClass">
    <!-- Accessing window or document directly is restricted -->
    <!-- {{ window.innerWidth }} -->
    <h1>This is an about page</h1>
    <button
      class="button"
      @click="
        () => {
          counter.increment()
          if (dynamicId) {
            dynamicId = ''
          } else {
            dynamicId = 'dynamic-id'
          }
          awesome = !awesome
        }
      "
    >
      Count is: {{ counter.count }}
    </button>
    <br />
    <button class="button" @click="isActive = !isActive">Toggle active</button>
    <p>Using text interpolation: {{ rawHtml }}</p>
    <p>Using v-html directive: <span v-html="rawHtml"></span></p>
    <p v-bind:id="dynamicId">with v-bind dynamic id</p>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no 😢</h1>
    <input v-model="typeText" type="text" />
    <div v-if="typeText === 'A'">A</div>
    <div v-else-if="typeText === 'B'">B</div>
    <div v-else-if="typeText === 'C'">C</div>
    <div v-else>Not A/B/C</div>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
    <ul>
      <li v-for="({ message }, index) in items" :key="index">
        使用解构 - {{ index }} - {{ message }}
      </li>
    </ul>
    <ul>
      <li v-for="(value, key, index) in myObject" :key="index">{{ key }}: {{ value }}</li>
    </ul>
    <!-- v-for with range -->
    <span v-for="n in 10" :key="n">{{ n }}&nbsp;</span>

    <p>You can also use <code>of</code> as the delimiter instead of <code>in</code></p>
    <div v-for="item of items" :key="item.message">
      {{ item.message }}
    </div>
  </div>
</template>

<style>
.about {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hidden {
  visibility: hidden;
}

.active {
  visibility: visible;
}

#dynamic-id {
  color: red;
}
</style>
