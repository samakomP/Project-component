<script setup lang="ts">
import { useRoute } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'

const route = useRoute()

defineProps({
  user: {
    type: Object,
    required: true
  },
  links: {
    type: Array as () => Array<{ label: string, name: string }>,
    required: true
  }
})
</script>

<template>
  <div class="relative w-full max-w-5xl mt-6 mx-auto font-serif text-black">
    
    <slot name="top-left"></slot>

    <CardBase class="!bg-[#f2f2f2] p-10 md:p-16 w-full flex flex-col gap-10 rounded-[40px] pt-16 relative shadow-sm">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8">
        
        <div class="flex items-center gap-8">
          <div class="w-40 h-40 rounded-full border-[3px] border-black flex items-center justify-center shrink-0 bg-transparent">
            <svg class="w-20 h-20 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          
          <div class="flex flex-col gap-2">

            <slot name="header-badge-left"></slot>
            
            <h1 class="text-5xl md:text-6xl font-bold tracking-wide mt-1">
              {{ user.name }} {{ user.surname }}
            </h1>
            <span class="text-[22px] font-bold text-[#a3a3a3] tracking-wide">
              Join Date : &nbsp;{{ user.joinDate || '05-1-2025' }}
            </span>
          </div>
        </div>

        <div class="flex flex-col gap-4 w-full md:w-auto items-end">
          <slot name="header-right">
            <PillLevel class="text-3xl font-bold px-10 py-2">
              Level {{ user.level }}
            </PillLevel>
          </slot>
        </div>
        
      </div>


      <div class="w-full mt-2">
        <nav class="flex justify-center items-center gap-8 md:gap-16 pb-3 border-b-[5px] border-[#5BF09F] w-full md:w-[85%] mx-auto">
          <router-link 
            v-for="link in links" 
            :key="link.name"
            :to="{ name: link.name, params: { id: user?.id } }"
            class="text-[26px] md:text-3xl font-bold transition-colors whitespace-nowrap"
            :class="route.name === link.name ? 'text-[#a3a3a3]' : 'text-black hover:text-gray-600'"
          >

            {{ route.name === link.name ? `|${link.label}|` : link.label }}
          </router-link>
        </nav>
      </div>


      <div class="w-full">
        <RouterView :user="user" />
      </div>


      <slot name="footer"></slot>

    </CardBase>
  </div>
</template>