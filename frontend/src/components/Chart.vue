<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<template>
  <div>
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Chart,
  BarElement,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  LineController,
  Tooltip,
  Legend,
} from 'chart.js'

// Registrar componentes necessários do Chart.js
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  LineController,
  Tooltip,
  Legend,
)

const props = defineProps({
  chartData: {
    type: Object,
    required: true,
  },
  chartOptions: {
    type: Object,
    required: true,
  },
})

console.log(props.chartData)

const chartInstance = ref<Chart | null>(null)
const chartCanvas = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (chartCanvas.value) {
    // console.log(props.chartData)
    chartInstance.value = new Chart(chartCanvas.value, {
      type: 'line',
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: props.chartData as any,
      options: props.chartOptions,
    })
  }
})

onBeforeUnmount(() => {
  if (chartInstance.value) {
    chartInstance.value.destroy()
  }
})
</script>
