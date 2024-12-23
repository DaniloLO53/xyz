<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon.vue'
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'

const props = defineProps<{
  change: number
}>()
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-[40%] flex justify-center">
      <ArrowDownIcon class="w-3 h-3 text-red-700" v-if="props.change < 0" />
      <ArrowUpIcon class="w-3 h-3 text-green-500" v-else />
      <span
        :class="{
          'text-red-500': props.change < 0,
          'text-green-500': props.change > 0,
        }"
      >
        {{
          new Intl.NumberFormat('en-US', {
            maximumFractionDigits: 2,
          }).format(Math.abs(props.change))
        }}%
      </span>
    </div>
  </div>
</template>
