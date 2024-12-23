<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import Coin from './Coin.vue'
import type { Coin as CoinType } from '@/types/coin'

type State = {
  coins: CoinType[]
  isLoading: boolean
}

const state = reactive<State>({
  coins: [],
  isLoading: false,
})

const fetchEconomicsData = async () => {
  const COINGECKO_BASE_URL = import.meta.env.VITE_COINGECKO_BASE_URL
  const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY
  const coingeckoOptions = {
    method: 'GET',
    url: `${COINGECKO_BASE_URL}coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d&precision=2`,
    headers: { accept: 'application/json', 'x-cg-demo-api-key': COINGECKO_API_KEY },
  }

  try {
    state.isLoading = true
    const { data: coins } = await axios(coingeckoOptions)
    state.coins = coins
  } catch (error) {
    console.error('Error fetching data from coingecko:', error)
  } finally {
    state.isLoading = false
  }
}

onMounted(async () => {
  await fetchEconomicsData()
})
</script>

<template>
  <ul class="flex flex-col space-y-1 divide-y divide-slate-200">
    <li
      class="h-[60px] relative grid grid-cols-[250px_120px_120px_120px_120px_120px_120px_120px] font-bold text-gray-700 items-center"
    >
      <div class="flex justify-center">Coin</div>
      <div class="flex justify-center">Price</div>
      <div class="flex justify-center">1h</div>
      <div class="flex justify-center">24h</div>
      <div class="flex justify-center">7d</div>
      <div class="flex justify-center">14d</div>
      <div class="flex justify-center">30d</div>
      <div class="flex justify-center">Market Cap</div>
    </li>
    <Coin v-for="coin in state.coins" :key="coin.id" :coin="coin" />
  </ul>
</template>
