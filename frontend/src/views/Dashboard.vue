<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import AddIcon from '@/assets/icons/AddIcon.vue'
import Button from '@/components/Button.vue'
import axios from 'axios'
import { getCookie } from 'typescript-cookie'
import { onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'

const state = reactive({
  wallets: [] as any,
  accessToken: '',
})

const route = useRoute() as unknown as any

const fetchWalletsData = async () => {
  const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
  const serverOptions = {
    method: 'GET',
    url: `${SERVER_BASE_URL}wallets`,
    headers: { accept: 'application/json', Authorization: `Bearer ${state.accessToken}` },
  }

  try {
    const { data: wallets } = await axios(serverOptions)
    state.wallets = wallets
  } catch (error) {
    console.error('Error fetching data from coingecko:', error)
  }
}

const createWallet = async () => {
  const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
  const serverOptions = {
    method: 'POST',
    url: `${SERVER_BASE_URL}wallets`,
    headers: { accept: 'application/json', Authorization: `Bearer ${state.accessToken}` },
  }

  try {
    await axios(serverOptions)
  } catch (error) {
    console.error('Error fetching data from coingecko:', error)
  }
}

onMounted(async () => {
  const accessToken = getCookie('accessToken') || ''
  state.accessToken = accessToken

  await fetchWalletsData()
})
</script>

<template>
  <div
    class="p-5 space-y-5 flex flex-col justify-center items-center"
    v-if="state.wallets.length === 0"
  >
    <p class="font-semibold">Seems like you don't have any wallet</p>
    <Button
      class="border border-slate-300 rounded px-5 py-2 bg-pink-500 text-white font-bold hover:scale-90 transition ease-in-out"
      @click="createWallet"
    >
      Add wallet
    </Button>
  </div>
  <ul v-if="state.wallets.length > 0" class="flex p-3 space-x-5">
    <li>
      <Button
        :class="route.name.toLowerCase().includes('dashboard') ? 'bg-pink-400' : ''"
        class="font-bold p-1 px-3 rounded-md"
      >
        <p>Overview</p>
      </Button>
    </li>
    <li v-for="wallet in state.wallets" :key="wallet">
      <Button
        :class="route.name.toLowerCase().includes(wallet.id) ? 'bg-pink-400' : ''"
        class="font-bold p-1 px-3 rounded-md"
      >
        <p>
          {{ wallet.name || 'New wallet' }}
        </p>
      </Button>
    </li>
    <li>
      <Button class="font-bold p-1 px-3 rounded-md flex items-center space-x-2">
        <AddIcon />
        <p>Add Wallet</p>
      </Button>
    </li>
  </ul>
  <h2 class="p-3 font-bold text-[24px]">Overview</h2>
</template>
