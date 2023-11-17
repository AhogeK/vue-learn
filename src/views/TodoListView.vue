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

// 11

function addNewTodo() {
  todos.value.push({
    id: todos.value.length + 1,
    title: newTodoText.value
  })
  newTodoText.value = ''
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
  </div>
</template>
