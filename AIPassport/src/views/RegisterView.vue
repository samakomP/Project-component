<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import CardAuth from '@/components/CardAuth.vue'
import { useAuthStore } from '@/stores/Auth' 
import { useMessageStore } from '@/stores/message'

import type { Auth } from '@/types'

const authStore = useAuthStore()
const messageStore = useMessageStore()
const router = useRouter()

const authData = ref<Auth>({
  username: '',
  password: ''
})

const handleRegister = async () => {
  const role = await authStore.login(authData.value.username)
  
  if (role === 'admin') {
    messageStore.updateMessage(`Registration successful! Welcome, Admin.`)
    router.push('/admin')
  } else if (role === 'user') {
    messageStore.updateMessage(`Registration successful! Welcome to your profile.`)
    router.push('/user')
  } else {
    messageStore.updateMessage(`Access Denied: Please use Admin1, user1, or user2.`)
  }
  setTimeout(() => {
    messageStore.resetMessage()
  }, 3000)
}

</script>

<template>
  <CardAuth>

    <template #header>
      <div class="text-center">
        <h1 class="text-2xl font-bold text-gray-900">Register</h1>
        <p class="text-gray-500/70 text-sm font-medium mt-1">AI Passport By So Cool and handsome</p>
      </div>
    </template>

    <template #default>
      <form @submit.prevent="handleRegister" class="space-y-5">
        
        <div>
          <label for="username" class="block text-sm font-medium text-gray-800 mb-2 font-serif">Username</label>
          <input 
            v-model="authData.username" 
            id="username" 
            type="text" 
            required 
            class="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
            placeholder="Admin1, user1, or user2"
          />
        </div>
        
        <div>
          <label for="password" class="block text-sm font-medium text-gray-800 mb-2 font-serif">Password</label>
          <input 
            v-model="authData.password" 
            id="password" 
            type="password" 
            required 
            class="w-full px-4 py-3 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent transition-all"
          />
        </div>

        <button 
          type="submit" 
          class="btn w-full px-4 py-3 bg-gray-900 text-white font-black text-2xl rounded-xl hover:bg-gray-800 transition-colors">
          Register
        </button>
        
      </form>
    </template>

    <template #footer>
      <div class="flex items-center mb-6">
        <div class="grow border-t border-gray-200"></div>
        <span class="px-4 text-sm text-gray-500 bg-transparent">or</span>
        <div class="grow border-t border-gray-200"></div>
      </div>

      <div class="text-center text-sm text-gray-700">

        Already got an account?

        <router-link to="/login" class="text-[#0055cc] hover:text-blue-800 font-semibold inline-flex items-center gap-1">
          Login <span aria-hidden="true" class="text-lg leading-none">&rarr;</span>
        </router-link>
      </div>

    </template>

  </CardAuth>
</template>