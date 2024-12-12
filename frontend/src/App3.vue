<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const name = ref('Danilo')
const status = ref(true)
const tasks = ref(['Task 1', 'Task 2', 'Task 3'])
const newTask = ref('Add something')

const toggleStatus = () => (status.value = !status.value)

const addTask = () => {
  if (newTask.value.trim() !== '') {
    tasks.value.push(newTask.value)
    newTask.value = ''
  }
}
const removeTask = (index: number) => tasks.value.splice(index, 1)

onMounted(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    const data = await response.json()
    tasks.value = data.map(({ title }: any) => title)
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status">User is active</p>
  <p v-else>User is inactive</p>
  <button @click="toggleStatus">Change status</button>
  <br /><br /><br />
  <form @submit.prevent="addTask">
    <label for="newTask">Add Task</label>
    <input type="text" id="newTask" name="newTask" v-model="newTask" />
    <button type="submit">Submit</button>
  </form>

  <ul>
    <li v-for="(task, index) in tasks" :key="task">
      {{ task }}
      <button @click="removeTask(index)">X</button>
    </li>
  </ul>
</template>
