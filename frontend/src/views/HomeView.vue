<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import Chart from '@/components/Chart.vue'
import Coins from '@/components/Coins.vue'
import axios from 'axios'
// import type { ChartData } from 'chart.js'
// import type { ChartData } from 'chart.js'
import { onMounted } from 'vue'
import { reactive } from 'vue'

type State = {
  prices: [number, number][]
  chartData: {
    labels: any
    datasets: any
  }
  chartOptions: object
}

const stateBitcoin = reactive<State>({
  prices: [],
  chartData: {
    labels: [],
    datasets: [],
  },
  chartOptions: {},
})
const stateEthereum = reactive<State>({
  prices: [],
  chartData: {
    labels: [],
    datasets: [],
  },
  chartOptions: {},
})
const stateSolana = reactive<State>({
  prices: [],
  chartData: {
    labels: [],
    datasets: [],
  },
  chartOptions: {},
})

const fetchEconomicsData = async () => {
  const COINGECKO_BASE_URL = import.meta.env.VITE_COINGECKO_BASE_URL
  const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY
  const coingeckoOptions = {
    method: 'GET',
    headers: { accept: 'application/json', 'x-cg-demo-api-key': COINGECKO_API_KEY },
  }
  const coingeckoOptionsBitcoin = {
    url: `${COINGECKO_BASE_URL}coins/bitcoin/market_chart?vs_currency=usd&days=7&precision=2`,
    ...coingeckoOptions,
  }
  const coingeckoOptionsEthereum = {
    url: `${COINGECKO_BASE_URL}coins/ethereum/market_chart?vs_currency=usd&days=7&precision=2`,
    ...coingeckoOptions,
  }
  const coingeckoOptionsSolana = {
    url: `${COINGECKO_BASE_URL}coins/solana/market_chart?vs_currency=usd&days=7&precision=2`,
    ...coingeckoOptions,
  }

  try {
    const { data: bitcoinData } = await axios(coingeckoOptionsBitcoin)
    const { data: ethereumData } = await axios(coingeckoOptionsEthereum)
    const { data: solanaData } = await axios(coingeckoOptionsSolana)

    stateBitcoin.prices = bitcoinData.prices
    stateEthereum.prices = ethereumData.prices
    stateSolana.prices = solanaData.prices
  } catch (error) {
    console.error('Error fetching data from coingecko:', error)
  }
}

onMounted(async () => {
  await fetchEconomicsData()

  stateBitcoin.chartData = {
    labels: stateBitcoin.prices.map((_, i) => i),
    datasets: [
      {
        data: stateBitcoin.prices.map((data) => {
          return data[1]
        }),
        borderColor: ['red'],
        borderWidth: 1,
        // tension: 0.4,
        pointRadius: 0,
      },
    ],
  }
  stateEthereum.chartData = {
    labels: stateEthereum.prices.map((_, i) => i),
    datasets: [
      {
        data: stateEthereum.prices.map((data) => {
          return data[1]
        }),
        borderColor: ['red'],
        borderWidth: 1,
        // tension: 0.4,
        pointRadius: 0,
      },
    ],
  }
  stateSolana.chartData = {
    labels: stateSolana.prices.map((_, i) => i),
    datasets: [
      {
        data: stateSolana.prices.map((data) => {
          return data[1]
        }),
        borderColor: ['red'],
        borderWidth: 1,
        // tension: 0.4,
        pointRadius: 0,
      },
    ],
  }
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false, // Remove a legenda
    },
    tooltip: {
      enabled: false, // Remove os tooltips
    },
  },
  scales: {
    x: {
      display: false, // Remove o eixo X
    },
    y: {
      display: false, // Remove o eixo Y
    },
  },
  elements: {
    line: {
      fill: false, // Garante que só a linha seja exibida
    },
  },
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="w-[70%] flex justify-evenly py-7 pb-28">
      <div class="w-[300px]">
        <div class="py-2">
          <span><strong>Bitcoin</strong></span>
        </div>
        <Chart
          :key="stateBitcoin.chartData.labels.length"
          :chartData="stateBitcoin.chartData"
          :chartOptions="chartOptions"
        />
      </div>
      <div class="w-[300px]">
        <div class="py-2">
          <span><strong>Ethereum</strong></span>
        </div>
        <Chart
          :key="stateEthereum.chartData.labels.length"
          :chartData="stateEthereum.chartData"
          :chartOptions="chartOptions"
        />
      </div>
      <div class="w-[300px]">
        <div class="py-2">
          <span><strong>Solana</strong></span>
        </div>
        <Chart
          :key="stateSolana.chartData.labels.length"
          :chartData="stateSolana.chartData"
          :chartOptions="chartOptions"
        />
      </div>
    </div>
    <div class="w-[70%] overflow-x-auto transform rotate-180 flex justify-center" dir="rtl">
      <div class="w-max transform rotate-180" dir="ltr">
        <Coins />
      </div>
    </div>
  </div>
</template>
