<script lang="ts" setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'neutral',
    validator: (value: string) => ['dark', 'light', 'neutral'].includes(value),
  },
})

const buttonClass = computed(() => {
  switch (props.variant) {
    case 'dark':
      return 'p-1 rounded-lg border border-slate hover:scale-90 transition ease-in-out bg-black'
    case 'light':
      return 'p-1 rounded-lg border border-slate hover:scale-90 transition ease-in-out'
    case 'neutral':
      return 'p-1 rounded-lg border border-slate hover:scale-90 transition ease-in-out'
    default:
      return ''
  }
})
</script>

<template>
  <button type="button" :class="buttonClass">
    <slot></slot>
  </button>
</template>
