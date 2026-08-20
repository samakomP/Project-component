<script setup lang="ts">

import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user';


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div class="max-w-7xl min-h-[85vh] mx-auto p-5 mt-7">
    <div v-if="user" class="md:col-span-2 flex flex-col gap-8">

      <CardBase class="p-8 md:p-12 relative bg-gray-50 rounded-3xl shadow-sm">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 rounded-full border-4 border-gray-900 flex items-center justify-center bg-white shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-10 h-10 text-gray-900">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            
            <div>
              <h1 class="font-serif font-bold text-3xl md:text-4xl text-gray-900">
                {{ user.fName }} {{ user.lName }}
              </h1>
              <p class="font-serif text-gray-400 text-lg mt-1">
                Join Date : 05-1-2025
              </p>
            </div>
          </div>

            <PillLevel class="absolute top-5 right-6 text-2xl">
                Level {{ user.level_ID }}
            </PillLevel>

        </div>

        
        <div class="border-b-2 border-emerald-300 pb-3 mb-8 w-full">
          <nav class="flex justify-center gap-9 md:gap-18 font-serif text-lg md:text-xl font-bold" >
            <router-link :to="{ name: 'userdetail-view', params: { id: user?.users_ID } }"
              class="text-gray-900 transition delay-150 duration-300 ease-in-out" 
              exact-active-class="!text-gray-400 border-x-2 border-gray-400 border-x-5 px-3">Detail</router-link>

            <router-link :to="{ name: 'user-service-view', params: { id: user?.users_ID } }"
              class="text-gray-900 transition delay-150 duration-300 ease-in-out"
              exact-active-class="!text-gray-400 border-x-2 border-gray-400 border-x-5 px-3">Services</router-link>
            
            <router-link :to="{ name: 'user-badge-view', params: { id: user?.users_ID } }"
              class="text-gray-900 transition delay-150 duration-300 ease-in-out"
              exact-active-class="!text-gray-400 border-x-2 border-gray-400 border-x-5 px-3">Badges</router-link>
            
            <router-link :to="{ name: 'user-history-view', params: { id: user?.users_ID } }"
              class="text-gray-900  transition delay-150 duration-300 ease-in-out" 
              exact-active-class="!text-gray-400 border-x-2 border-gray-400 border-x-5 px-3">History Exam</router-link>
          </nav>
        </div>

        <RouterView :uesr="user"/>
      </CardBase>
    </div>
  </div>
</template>
<style scoped>
</style>