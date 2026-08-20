<script setup lang="ts">
import { RouterLink } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
 <div class="max-w-7xl min-h-[85vh] mx-auto p-5 mt-7">
  <div v-if="user" class="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
    
    <div class="md:col-span-2 flex flex-col gap-8">
      <CardBase class="text-center p-18">
        <h1 class="text-4xl font-serif text-gray-900 mb-4">Welcome back!, {{ user.username }}</h1>
        <p class="text-xl font-bold text-gray-900">I've got some jobs ready for you.</p>
      </CardBase>

      <div class="grid grid-cols-2 gap-8 flex-1">
        <RouterLink :to="{ name: 'learning-view', params: { id: user.id } }" class="block h-full">
          <CardBase class="p-15 items-center justify-center text-center gap-4 hover:scale-106 transition">
            <div class="mx-auto relative w-20 h-20 mb-4">
              <svg class="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="Orange" class="absolute -top-3 -right-3 w-8 h-8 z-10 rotate-18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-gray-900">E-Learning</h2>
          </CardBase>
        </RouterLink>

        <RouterLink :to="{ name: 'exam-view', params: { id: user.id } }" class="block h-full">
          <CardBase class="p-15 items-center justify-center text-center gap-4 hover:scale-106 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-20 h-20 text-gray-700 mx-auto mb-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
            </svg>
            <h2 class="text-2xl font-bold text-gray-900">Exam</h2>
          </CardBase>
        </RouterLink>
      </div>
    </div>

    <RouterLink :to="{ name: 'levelBenefit-view', params: { id: user.id } }" class="block h-full">
      <CardBase class="p-18 text-center items-center justify-center hover:scale-106 transition">
        <p class="text-gray-500 font-medium mb-2">You're current level at</p>
        <h2 class="text-5xl font-black text-gray-900 mb-8">{{ user.level}}</h2>
        <div class="flex flex-col gap-4 w-full max-w-[200px] mx-auto">
          <div :class="user.level >= 1 ? 'bg-green-400' : 'bg-gray-300'" 
            class="text-white font-bold text-xl py-2 rounded-full w-full">Level 1</div>
          <div :class="user.level >= 2 ? 'bg-green-400' : 'bg-gray-300'" 
            class="text-white font-bold text-xl py-2 rounded-full w-full">Level 2</div>
          <div :class="user.level >= 3 ? 'bg-green-400' : 'bg-gray-300'"
            class="text-white font-bold text-xl py-2 rounded-full w-full">Level 3</div>
          <div :class="user.level >= 4 ? 'bg-green-400' : 'bg-gray-300'"
            class="text-white font-bold text-xl py-2 rounded-full w-full">Level 4</div>
        </div>
      </CardBase>
    </RouterLink>

  </div>
</div>
</template>