<script lang="ts" setup>
import { ref } from "vue";
import TodoItem from "@/components/TodoItem.vue";

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
  if (target.value === ''""{
    age.value = ''"";   target.value = ''""; } else {
    const intValue = parseInt(target?.value, 10) || 0;
    age.value = intValue;
    target.value = intValue.toString();
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
    <input id="checkbox" v-model="checked" type="checkbox" />
    <label for="checkbox">{{ checked }}</label>
    <br />
    <div>Checked names: {{ checkedNames }}</div>

    <input id="jack" v-model="checkedNames" type="checkbox" value="Jack" />
    <label for="jack">Jack</label>

    <input id="john" v-model="checkedNames" type="checkbox" value="John" />
    <label for="john">John</label>

    <input id="mike" v-model="checkedNames" type="checkbox" value="Mike" />
    <label for="mike">Mike</label>

    <div>Picked: {{ picked }}</div>

    <input id="one" v-model="picked" type="radio" value="One" />
    <label for="one">One</label>

    <input id="two" v-model="picked" type="radio" value="Two" />
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
    <input v-model="picked" type="radio" value="a" /> picked: {{ picked }}
    <br />

    <!-- `toggle` is either true or false -->
    <input v-model="toggle" type="checkbox" /> toggle: {{ toggle }}
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
      :false-value="dynamicFalseValue"
      v-model="toggle"
      :true-value="dynamicTrueValue"
      type="checkbox"
    />
    toggle: {{ toggle }}
    <br />

    <input v-model="pick" :value="first" type="radio" /> first
    <input v-model="pick" :value="second" type="radio" /> second
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