<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)

const isAdmin = computed(() => authStore.user?.role === 'admin')

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
  isSidebarOpen.value = false
}
</script>

<template>
  <header v-if="route.path !== '/login' && route.path !== '/register'" class="bg-white px-6 pt-6 pb-4 relative z-40">
    <div v-if="user" class="flex justify-between items-center max-w-8xl mx-auto">
      
      <button @click="toggleSidebar" class="focus:outline-none hover:opacity-70 transition">
        <svg class="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>

      <RouterLink v-if="isAdmin" :to="{ name: 'admin-home-view', params: { id: authStore.user?.id } }" class="flex items-center gap-3">
        <span class="font-serif font-medium text-lg text-gray-900">
          Admin
        </span>
        <div class="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </div>
      </RouterLink>

      <RouterLink v-else :to="{ name: 'userdetail-view', params: { id: authStore.user?.id } }" class="flex items-center gap-3">
        <span class="font-serif font-medium text-lg text-gray-900">
          {{ user.username || 'Guest' }}
        </span>
        <div class="w-10 h-10 rounded-full border-2 border-gray-900 flex items-center justify-center">
          <svg class="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
        </div>
      </RouterLink>

    </div>

    <div class="w-full max-w-6xl mx-auto h-2 bg-purple-300 mt-7 rounded-[40px]"></div>
  </header>

  <div v-if="isSidebarOpen" class="fixed inset-0 z-50 flex">
    
    <div v-if="isAdmin" class="w-[340px] h-full bg-[#f9e5cc] shadow-2xl p-8 flex flex-col items-start">
      <button @click="toggleSidebar" class="mb-16 focus:outline-none hover:opacity-70 transition">
        <svg class="w-12 h-12 text-[#15803d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div class="w-10 h-1.5 bg-[#15803d] mt-1 ml-1 rounded-3xl"></div>
      </button>

      <nav class="flex flex-col gap-12 text-3xl font-serif font-bold w-full pl-6">
        <RouterLink :to="{ name: 'admin-home-view', params: { id: authStore.user?.id } }" @click="toggleSidebar" class="text-black hover:opacity-70  hover:underline hover:underline-offset-8 hover:decoration-2 transition cursor-pointer">Dashboard</RouterLink>
        <span class="text-black/50">User</span>
        <RouterLink :to="{ name: 'admin-level', params: { id: authStore.user?.id } }" @click="toggleSidebar" class="text-black hover:opacity-70 hover:underline hover:underline-offset-8 hover:decoration-2 transition cursor-pointer">Level</RouterLink>
      </nav>

      <button @click="handleLogout" class="flex items-center gap-3 text-3xl font-serif font-bold text-[#cc3300] underline underline-offset-8 decoration-3 hover:opacity-70 mt-auto mb-10 pl-6">
        Logout 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>
    </div>

    <div v-else class="w-64 h-full bg-[#f9e5cc] shadow-2xl p-6 flex flex-col">
      <button @click="toggleSidebar" class="mb-12 focus:outline-none hover:opacity-70 transition">
        <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <div class="w-8 h-1 bg-green-600 mt-px-[0.25] ml-1 rounded-3xl"></div>
      </button>

      <nav class="flex flex-col gap-8 grow text-center text-4xl font-serif font-medium">
        <RouterLink :to="{ name: 'userhome-view', params: { id: authStore.user?.id } }" @click="toggleSidebar" class=" text-black hover:text-gray-600 transition" exact-active-class="text-green-500 underline underline-offset-4 decoration-2">Home</RouterLink>
        <RouterLink :to="{ name: 'learning-view', params: { id: authStore.user?.id } }" @click="toggleSidebar" class=" text-black hover:text-gray-600 transition" exact-active-class="text-green-500 underline underline-offset-4 decoration-2">E-Learning</RouterLink>
        <RouterLink :to="{ name: 'levelBenefit-view', params: { id: authStore.user?.id } }" @click="toggleSidebar" class=" text-black hover:text-gray-600 transition" exact-active-class="text-green-500 underline underline-offset-4 decoration-2">Benefits</RouterLink>
        <RouterLink :to="{ name: 'exam-view', params: { id: authStore.user?.id } }" @click="toggleSidebar" class="text-black hover:text-gray-600 transition" exact-active-class="text-green-500 underline underline-offset-4 decoration-2">Exam</RouterLink>
      </nav>

      <button @click="handleLogout" class="flex items-center gap-2 text-3xl font-serif font-bold text-red-600 underline underline-offset-4 decoration-3 hover:opacity-70 mt-auto mb-8 ml-7">
        Logout 
        <svg xmlns="http://www.w3.org/2000/svg" class="w-14 h-14" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
        </svg>
      </button>
    </div>

    <div @click="toggleSidebar" class="grow bg-black/40"></div>
  </div>
</template>
