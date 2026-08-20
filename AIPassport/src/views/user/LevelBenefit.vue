<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import BackHome from '@/components/BackHome.vue'
import { getLevels, getBenefitsByLevel } from '@/services/LevelService'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentUserLevel = computed(() => user.value?.level || 2)

const benefitsData = computed(() =>
  getLevels().map(level => ({
    level: level.levelNumber,
    benefits: getBenefitsByLevel(level.levelNumber),
  }))
)
</script>

<template>
  <div class="relative w-full flex flex-col items-center mt-8 px-4 pb-12 font-serif">
    <back-home class="absolute -top-4 left-58"/>
    <div class="w-full max-w-4xl flex flex-col gap-8 mt-8">
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
            'relative flex flex-col rounded-[30px] w-full md:w-2/3 p-8 transition-colors duration-300 shadow-sm',
            item.level <= currentUserLevel ? 'bg-[#9ef0c6] text-black' : 'bg-[#e5e7eb] text-black'
          ]"
        >
          <h3 class="text-3xl font-bold text-center mb-6 tracking-wide">Benefit</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8 px-6 md:px-12 inline-auto">
            <div
              v-for="benefit in item.benefits"
              :key="benefit.id"
              class="flex items-start gap-3 items">
              <span class=" text-xl font-bold leading-none mt-1">&bull;</span>
              <div class="flex flex-col">
                <span class="text-xl font-bold leading-tight">{{ benefit.name }}</span>
                <span class="text-sm font-medium leading-tight opacity-80 pt-4">{{ benefit.description }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>