<script setup lang="ts">
import { computed } from 'vue'
import CardBase from '@/components/CardBase.vue'
import { getUsers } from '@/services/UserService'

const totalUsers = computed(() => getUsers().length)
const activeUsers = computed(() => getUsers().filter(user => user.active).length)
</script>

<template>
  <div class="w-full flex flex-col items-center mt-6 px-4 pb-12 font-sans text-black">
    <div class="w-full max-w-5xl flex flex-col gap-8">
      
      <div class="flex flex-col md:flex-row gap-6 w-full">
        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-8 md:p-10 flex flex-col justify-center items-center w-full md:w-3/5 min-h-[220px]">
          <h1 class="text-4xl font-serif font-bold text-center mb-4 tracking-wide">Welcome back!</h1>
          <p class="text-[22px] font-bold text-center tracking-tight">I've got some jobs ready for you.</p>
        </CardBase>
        
        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-8 md:p-10 flex flex-col items-center justify-center w-full md:w-1/5 min-h-[220px]">
          <h2 class="text-2xl font-bold text-center mb-2 whitespace-nowrap">Active User</h2>
          <span class="text-[80px] leading-none font-bold">{{ activeUsers }}</span>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-8 md:p-10 flex flex-col items-center justify-center w-full md:w-1/5 min-h-[220px]">
          <h2 class="text-2xl font-bold text-center mb-2 whitespace-nowrap">Total User</h2>
          <span class="text-[80px] leading-none font-bold">{{ totalUsers }}</span>
        </CardBase>
      </div>

      <div class="flex flex-col md:flex-row gap-8 w-full">
        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-12 flex flex-col items-center justify-center w-full md:w-1/2 cursor-pointer hover:scale-[1.02] transition-transform duration-300 min-h-[350px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#233237" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-32 h-32 mb-6">
            <circle cx="12" cy="12" r="10"></circle>
            <circle cx="12" cy="10" r="3"></circle>
            <path d="M6.168 18.849A8.966 8.966 0 0112 16a8.966 8.966 0 015.832 2.849"></path>
          </svg>
          <h2 class="text-[28px] font-bold">User Management</h2>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-12 flex flex-col items-center justify-center w-full md:w-1/2 cursor-pointer hover:scale-[1.02] transition-transform duration-300 min-h-[350px]">
          <svg viewBox="0 0 24 24" fill="none" stroke="#233237" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="w-32 h-32 mb-6">
            <circle cx="12" cy="8" r="6"></circle>
            <path d="M12 4.5l1.5 3 3 .5-2 2 .5 3-3-1.5-3 1.5.5-3-2-2 3-.5z"></path>
            <path d="M8.2 12.7l-1.5 7.3 5.3-2.3 5.3 2.3-1.5-7.3"></path>
          </svg>
          <h2 class="text-[28px] font-bold">Level Detail</h2>
        </CardBase>
      </div>
      
    </div>
  </div>
</template>
