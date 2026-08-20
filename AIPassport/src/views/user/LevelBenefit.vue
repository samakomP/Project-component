<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentUserLevel = computed(() => user.value?.level || 2)

const benefitsData = ref([
  {
    level: 1,
    benefits: ['Get some job', 'Get some food', 'Get some workout', 'Get some gf']
  },
  {
    level: 2,
    benefits: ['Get some job', 'Get some food', 'Get some workout', 'Get some gf']
  },
  {
    level: 3,
    benefits: ['Get some job', 'Get some food', 'Get some workout', 'Get some gf']
  },
  {
    level: 4,
    benefits: ['Get some job', 'Get some food', 'Get some workout', 'Get some gf']
  }
])
</script>

<template>
  <div class="w-full flex flex-col items-center mt-8 px-4 pb-12 font-serif">
    <div class="w-full max-w-4xl flex flex-col gap-8">
      <div 
        v-for="item in benefitsData" 
        :key="item.level"
        class="flex flex-col md:flex-row gap-6 w-full"
      >
        <div 
          :class="[
            'flex items-center justify-center rounded-[30px] w-full md:w-1/3 p-10 shrink-0 transition-colors duration-300 shadow-sm',
            item.level <= currentUserLevel ? 'bg-[#9ef0c6] text-black' : 'bg-[#e5e7eb] text-black'
          ]"
        >
          <h2 class="text-3xl font-bold tracking-wide">Level {{ item.level }}</h2>
        </div>
        
        <div 
          :class="[
            'flex flex-col rounded-[30px] w-full md:w-2/3 p-8 transition-colors duration-300 shadow-sm',
            item.level <= currentUserLevel ? 'bg-[#9ef0c6] text-black' : 'bg-[#e5e7eb] text-black'
          ]"
        >
          <h3 class="text-3xl font-bold text-center mb-6 tracking-wide">Benefit</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 px-4 md:px-12">
            <div 
              v-for="(benefit, index) in item.benefits" 
              :key="index" 
              class="flex items-start gap-3"
            >
              <span class="text-xl font-bold leading-none mt-1">&bull;</span>
              <span class="text-lg font-bold leading-tight">{{ benefit }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>