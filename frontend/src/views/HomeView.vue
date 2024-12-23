<script setup lang="ts">
import Coins from '@/components/Coins.vue'
</script>

<template>
  <div class="flex justify-center">
    <div class="w-[70%] overflow-x-auto transform rotate-180" dir="rtl">
      <div class="w-max transform rotate-180" dir="ltr">
        <Coins />
      </div>
    </div>
  </div>
</template>
