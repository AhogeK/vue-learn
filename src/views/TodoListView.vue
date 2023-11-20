<script lang="ts" setup>
import { ref } from 'vue'
import TodoItem from '@/components/TodoItem.vue'

const newTodoText = ref('')
const todos = ref([
  {
    id: 1,
    title: 'Do the dishes'
  },
  {
    id: 2,
    title: 'Take out the trash'
  },
  {
    id: 3,
    title: 'Mow the lawn'
  }
])
const message = ref('')
const multilineMessage = ref('')
const checked = ref(false)
const checkedNames = ref([])
const picked = ref('')
const selected = ref('')
const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])
const selected2 = ref('A')
const multipleSelected = ref([])
const toggle = ref(true)
const dynamicTrueValue = ref('🙆')
const dynamicFalseValue = ref('🙅')
const first = ref({ a: 1 })
const second = ref({ b: 2 })
const pick = ref(null)
const msg = ref('')
const age = ref<string | number>(0)

function addNewTodo() {
  todos.value.push({
    id: todos.value.length + 1,
    title: newTodoText.value
  })
  newTodoText.value = ''
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.value === '') {
    age.value = ''
    target.value = ''
  } else {
    const intValue = parseInt(target?.value, 10) || 0
    age.value = intValue
    target.value = intValue.toString()
  }
}
</script>
<template>
  <div>
    <form @submit.prevent="addNewTodo">
      <label>Add a todo</label>
      <input
        id="new-todo"
        v-model.trim="newTodoText"
        @keyup.alt.enter="newTodoText = ''"
        placeholder="E.g. Feed the cat"
      />
      <button>Add</button>
    </form>
    <ul>
      <todo-item
        v-for="(todo, index) in todos"
        :key="todo.id"
        :title="todo.title"
        @remove="todos.splice(index, 1)"
      />
    </ul>

    <p>Message is : {{ message }}</p>
    <input v-model="message" placeholder="edit me" />
    <br />
    <span>Multiline message is:</span>
    <p style="white-space: pre-line">{{ multilineMessage }}</p>
    <textarea v-model="multilineMessage" placeholder="add multiple lines" rows="10" />
    <br />
    <input type="checkbox" id="checkbox" v-model="checked" />
    <label for="checkbox">{{ checked }}</label>
    <br />
    <div>Checked names: {{ checkedNames }}</div>

    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames" />
    <label for="jack">Jack</label>

    <input type="checkbox" id="john" value="John" v-model="checkedNames" />
    <label for="john">John</label>

    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames" />
    <label for="mike">Mike</label>

    <div>Picked: {{ picked }}</div>

    <input type="radio" id="one" value="One" v-model="picked" />
    <label for="one">One</label>

    <input type="radio" id="two" value="Two" v-model="picked" />
    <label for="two">Two</label>

    <div>Selected: {{ selected }}</div>
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <div>Selected: {{ multipleSelected }}</div>
    <select v-model="multipleSelected" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>

    <br />

    <select v-model="selected2">
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text }}
      </option>
    </select>
    <div>Selected: {{ selected2 }}</div>
    <!-- `picked` is a string "a" when checked -->
    <input type="radio" v-model="picked" value="a" /> picked: {{ picked }}
    <br />

    <!-- `toggle` is either true or false -->
    <input type="checkbox" v-model="toggle" /> toggle: {{ toggle }}
    <br />

    <!-- `selected` is a string "abc" when the first option is selected -->
    <select v-model="selected">
      <option disabled value="">Please select one</option>
      <option value="abc">ABC</option>
      <option value="bcd">BCD</option>
      <option value="cde">CDE</option>
    </select>
    <br />

    <input
      type="checkbox"
      v-model="toggle"
      :true-value="dynamicTrueValue"
      :false-value="dynamicFalseValue"
    />
    toggle: {{ toggle }}
    <br />

    <input type="radio" v-model="pick" :value="first" /> first
    <input type="radio" v-model="pick" :value="second" /> second
    {{ pick }}
    <br />

    <select v-model="selected">
      <!-- inline object literal -->
      <option :value="{ number: 123 }">123</option>
    </select>
    {{ selected }}
    <br />

    <input v-model.lazy="msg" /> {{ msg }}
    <br />

    <input v-model.number.trim="age" type="number" @input="handleInput" /> age: {{ age }}
  </div>
</template>