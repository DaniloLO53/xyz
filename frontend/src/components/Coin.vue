<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import type { Coin as CoinType } from '@/types/coin'
import CoinPercentageChange from './CoinPercentageChange.vue'

const props = defineProps<{
  coin: CoinType
}>()
</script>

<template>
  <li class="py-3 grid grid-cols-[250px_120px_120px_120px_120px_120px_120px_120px]">
    <div class="flex items-center justify-center">
      <div class="flex space-x-3 items-center w-[60%]">
        <img :src="props.coin.image" class="h-[35px]" />
        <div class="flex flex-col">
          <span
            ><strong>{{ props.coin.name }}</strong></span
          >
          <span>{{ props.coin.symbol.toUpperCase() }}</span>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div class="w-[40%] flex justify-end">
        ${{
          new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format(props.coin.current_price)
        }}
      </div>
    </div>
    <CoinPercentageChange :change="props.coin.price_change_percentage_1h_in_currency || 0" />
    <CoinPercentageChange :change="props.coin.price_change_percentage_24h_in_currency || 0" />
    <CoinPercentageChange :change="props.coin.price_change_percentage_7d_in_currency || 0" />
    <CoinPercentageChange :change="props.coin.price_change_percentage_14d_in_currency || 0" />
    <CoinPercentageChange :change="props.coin.price_change_percentage_30d_in_currency || 0" />
    <div class="flex items-center">
      <div class="flex justify-start">
        ${{
          new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 3,
          }).format(props.coin.market_cap)
        }}
      </div>
    </div>
  </li>
</template>
