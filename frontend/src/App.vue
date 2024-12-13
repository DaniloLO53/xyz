<script setup lang="ts">
import TopBarEconomics from '@/components/TopBarEconomics.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="text-default">
    <TopBarEconomics />
    <RouterView />
  </div>
</template>
