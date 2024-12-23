<script setup lang="ts">
import { reactive, ref } from 'vue'
import Button from './Button.vue'
import axios, { type AxiosRequestConfig } from 'axios'
import { userUserStore } from '@/stores/user'
import { setCookie } from 'typescript-cookie'

type FormType = {
  type: 'SIGNIN' | 'SIGNUP'
}
const formTypeUrlDto = {
  SIGNIN: 'auth/signin',
  SIGNUP: 'users',
}

const isLoading = ref(false)
const formType = reactive<FormType>({
  type: 'SIGNUP',
})
const userStore = userUserStore()

const setFormType = ({ type }: FormType) => {
  formType.type = type
}

const handleSubmit = async () => {
  const SERVER_BASE_URL = import.meta.env.VITE_SERVER_BASE_URL
  const serverOptions: AxiosRequestConfig = {
    method: 'POST',
    url: `${SERVER_BASE_URL}${formTypeUrlDto[formType.type]}`,
    headers: { accept: 'application/json' },
    data: { email: userStore.email, password: userStore.password },
  }
  try {
    isLoading.value = true
    const { data } = await axios(serverOptions)

    if (data.accessToken && data.refreshToken) {
      setCookie('accessToken', data.accessToken, { expires: 1 })
      console.log({ data })
      window.location.href = '/dashboard'
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="fixed z-10 top-0 w-screen h-screen bg-black/60 flex items-center justify-center">
    <div class="p-5 bg-white rounded-md">
      <slot></slot>
      <div class="py-3">
        <Button
          :class="`border border-slate-300 rounded w-[50%] px-5 py-2 ${formType.type === 'SIGNIN' ? 'bg-pink-500 text-white' : ''}`"
          @click="setFormType({ type: 'SIGNIN' })"
          >Sign In</Button
        >
        <Button
          :class="`border border-slate-300 rounded w-[50%] px-5 py-2 ${formType.type === 'SIGNUP' ? 'bg-pink-500 text-white' : ''}`"
          @click="setFormType({ type: 'SIGNUP' })"
          >Sign Up</Button
        >
      </div>
      <form
        @submit.prevent="handleSubmit"
        class="flex flex-col items-center justify-center space-y-5"
      >
        <input
          class="p-3 border rounded-md"
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
          v-model="userStore.email"
        />

        <input
          class="p-3 border rounded-md"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
          v-model="userStore.password"
        />

        <Button
          type="submit"
          class="border border-slate-300 rounded w-full px-5 py-2 bg-pink-500 text-white font-bold"
        >
          {{ formType.type === 'SIGNIN' ? 'Sign In' : 'Sign Up' }}
        </Button>
      </form>
    </div>
  </div>
</template>
