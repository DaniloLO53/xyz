<script lang="ts">
export default {
  data() {
    return {
      name: 'Danilo',
      status: true,
      tasks: ['Task 1', 'Task 2', 'Task 3'],
      link: 'https://google.com',
    }
  },
  methods: {
    toggleStatus() {
      this.status = !this.status
    },
  },
}
</script>

<template>
  <h1>{{ name }}</h1>
  <p v-if="status">User is active</p>
  <p v-else>User is inactive</p>
  <!-- <button v-on:click="toggleStatus">Change status</button> -->
  <button @click="toggleStatus">Change status</button>
  <ul>
    <li v-for="task in tasks" :key="task">{{ task }}</li>
  </ul>
  <!-- <a v-bind:href="link">Quit</a> -->
  <a :href="link">Quit</a>
</template>
