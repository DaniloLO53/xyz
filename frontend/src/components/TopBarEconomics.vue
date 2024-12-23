<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import ProfileIcon from '@/assets/icons/ProfileIcon.vue'
import Button from './Button.vue'
import axios from 'axios'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon.vue'
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'
import Gauge from './Gauge.vue'
import SignInScreen from './SignInScreen.vue'
import CloseIcon from '@/assets/icons/CloseIcon.vue'
import { getCookie, removeCookie } from 'typescript-cookie'

const COINGECKO_BASE_URL = import.meta.env.VITE_COINGECKO_BASE_URL
const COINGECKO_API_KEY = import.meta.env.VITE_COINGECKO_API_KEY
const coingeckoOptions = {
  method: 'GET',
  url: `${COINGECKO_BASE_URL}simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true&precision=2`,
  headers: { accept: 'application/json', 'x-cg-demo-api-key': COINGECKO_API_KEY },
}

const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
const serverOptions = {
  method: 'GET',
  url: `${SERVER_BASE_URL}external/fear_and_greed`,
  headers: { accept: 'application/json' },
}

const state = reactive({
  isLoading: true,
  coins: {
    btc: {
      usd: 0,
      usd_24h_change: 0,
    },
    eth: {
      usd: 0,
      usd_24h_change: 0,
    },
  },
  greedAndFear: 0,
})
const userButtonIsFocused = ref(false)
const showSignInScreen = ref(false)
const isUserSignedIn = ref(false)

const fetchEconomicsData = async () => {
  try {
    const { data: coinGeckoData } = await axios(coingeckoOptions)
    const { data: greedAndFear } = (await axios(serverOptions)) as any

    const { bitcoin, ethereum } = coinGeckoData
    state.coins.btc.usd = bitcoin.usd
    state.coins.btc.usd_24h_change = bitcoin.usd_24h_change
    state.coins.eth.usd = ethereum.usd
    state.coins.eth.usd_24h_change = ethereum.usd_24h_change

    state.greedAndFear = greedAndFear.value
  } catch (error) {
    console.error('Error fetching data from coingecko:', error)
  } finally {
    state.isLoading = false
  }
}

const handleClickOutsideDropdown = (event: any) => {
  const dropdown = document.querySelector('.dropdown')!
  if (!dropdown.contains(event.target)) {
    userButtonIsFocused.value = false
  }
}

const checkIsSignedIn = () => {
  const accessToken = getCookie('accessToken')
  if (accessToken) {
    isUserSignedIn.value = true
  }
}

const signOut = () => {
  removeCookie('accessToken')
  window.location.href = '/'
}

onMounted(async () => {
  await fetchEconomicsData()
  checkIsSignedIn()
  document.addEventListener('click', handleClickOutsideDropdown)
})
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutsideDropdown)
})
</script>

<template>
  <div class="flex justify-center text-xs border border-b-slate relative h-[55px]">
    <RouterLink :to="'/'" class="px-3 py-1 h-full absolute left-0">
      <img src="@/assets/images/logo_horizontal.png" class="h-full" />
    </RouterLink>
    <div class="w-[70%] flex items-center justify-between">
      <ul class="flex space-x-8 items-center">
        <li class="flex items-center space-x-2">
          <span> BTC: </span>
          <span v-if="state.isLoading === false" class="text-strong"
            ><strong
              >${{ new Intl.NumberFormat('en-US').format(state.coins.btc.usd) }}</strong
            ></span
          >
          <div class="flex items-center">
            <ArrowDownIcon class="w-3 h-3 text-red-700" v-if="state.coins.btc.usd_24h_change < 0" />
            <ArrowUpIcon class="w-3 h-3 text-green-500" v-else />
            <span
              :class="{
                'text-red-500': state.coins.btc.usd_24h_change < 0,
                'text-green-500': state.coins.btc.usd_24h_change > 0,
              }"
            >
              {{ state.coins.btc.usd_24h_change.toPrecision(2) }}%
            </span>
          </div>
        </li>
        <li class="flex space-x-2 items-center">
          <span> ETH: </span>
          <span v-if="state.isLoading === false" class="text-strong"
            ><strong
              >${{
                new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 3,
                }).format(state.coins.eth.usd)
              }}</strong
            ></span
          >
          <div class="flex items-center">
            <ArrowDownIcon class="w-3 h-3 text-red-700" v-if="state.coins.eth.usd_24h_change < 0" />
            <ArrowUpIcon class="w-3 h-3 text-green-500" v-else />
            <span
              :class="{
                'text-red-500': state.coins.eth.usd_24h_change < 0,
                'text-green-500': state.coins.eth.usd_24h_change > 0,
              }"
            >
              {{ state.coins.eth.usd_24h_change.toPrecision(2) }}%
            </span>
          </div>
        </li>
        <li class="flex space-x-2 items-center">
          <Gauge :value="state.greedAndFear" />
        </li>
      </ul>
      <div class="space-y-1 dropdown">
        <Button @focus="userButtonIsFocused = true" variant="light">
          <ProfileIcon />
        </Button>
        <ul
          class="w-[150px] text-strong absolute divide-y divide-slate border rounded-md shadow-md"
          v-if="userButtonIsFocused === true"
        >
          <li class="p-3 font-semibold hover:bg-gray-100">
            <Button @click="isUserSignedIn ? signOut() : (showSignInScreen = true)">
              {{ isUserSignedIn ? 'Sign Out' : 'Sign In' }}
            </Button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <SignInScreen v-if="showSignInScreen">
    <div class="flex justify-end">
      <Button class="rounded-[50%] bg-slate-100 p-1" @click="showSignInScreen = false">
        <CloseIcon />
      </Button>
    </div>
  </SignInScreen>
</template>
