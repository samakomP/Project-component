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
          <span class="text-[80px] leading-none font-bold pl-10">{{ activeUsers }}</span>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-8 md:p-10 flex flex-col items-center justify-center w-full md:w-1/5 min-h-[220px]">
          <h2 class="text-2xl font-bold text-center mb-2 whitespace-nowrap">Total User</h2>
          <span class="text-[80px] leading-none font-bold pl-10">{{ totalUsers }}</span>
        </CardBase>
      </div>

      <div class="flex flex-col md:flex-row gap-8 w-full">
        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-12 flex flex-col items-center justify-center w-full md:w-1/2 cursor-pointer hover:scale-[1.02] transition-transform duration-300 min-h-[350px]">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-40 items items-center justify-center mx-auto">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
          <h2 class="text-[28px] font-bold">User Management</h2>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-12 flex flex-col items-center justify-center w-full md:w-1/2 cursor-pointer hover:scale-[1.02] transition-transform duration-300 min-h-[350px]">
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="size-40">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                    </svg>
          <h2 class="text-[28px] font-bold">Level Detail</h2>
        </CardBase>
      </div>
      
    </div>
  </div>
</template>
