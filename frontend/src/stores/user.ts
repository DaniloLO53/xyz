import { defineStore } from 'pinia'
import { ref } from 'vue'
import { ids } from './ids'

export const userUserStore = defineStore(ids.USER, () => {
  // const isUserSignedIn = ref(false)
  const email = ref('')
  const password = ref('')

  // const signIn = () => {
  //   if (email.value && password.value) {
  //     isUserSignedIn.value = true
  //   }
  // }

  // const signOut = () => {
  //   isUserSignedIn.value = false
  //   email.value = ''
  //   password.value = ''
  // }

  // return { isUserSignedIn, signIn, signOut, email, password }
  return { email, password }
})
