<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import BackHome from '@/components/BackHome.vue'
import LevelService from '@/services/LevelService'
import UserServices from '@/services/UserServices'
import type { Benefit, Level } from '@/types'

interface BenefitRaw {
  benefits_ID: number
  level_ID: number
  benefitName: string
  description: string
}

interface LevelRaw {
  level_ID: number
  levelNumber: number
  passCriteria: number
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentUserLevel = computed(() => user.value?.level || 2)

const allBenefits = ref<Benefit[]>([])
const levels = ref<Level[]>([])

onMounted(() => {
  UserServices.getBenefits()
    .then((response) => {
      allBenefits.value = response.data.map((benefit: BenefitRaw) => ({
        id: benefit.benefits_ID,
        level: benefit.level_ID,
        name: benefit.benefitName,
        description: benefit.description,
      }))
    })
    .catch((error) => {
      console.error('Error fetching benefits', error)
    })

  LevelService.getLevels().then((response) => {
    levels.value = response.data.map((raw: LevelRaw): Level => ({
      id: raw.level_ID,
      levelNumber: raw.levelNumber,
      name: `Level ${raw.levelNumber}`,
      passCriteria: raw.passCriteria,
    }))
  })
})

const benefitsData = computed(() =>
  levels.value.map(level => ({
    level: level.levelNumber,
    benefits: allBenefits.value.filter(benefit => benefit.level === level.levelNumber),
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
