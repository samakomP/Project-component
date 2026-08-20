<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import { getLevels } from '@/services/LevelService'
import { getQuestionsByLevel } from '@/services/ExamService'
import BackHome from '@/components/BackHome.vue'
import { useAuthStore } from '@/stores/Auth'
import { useMessageStore } from '@/stores/message'
import { storeToRefs } from 'pinia'



const messageStore = useMessageStore()
const { messageEdit } = storeToRefs(messageStore)


const levelsData = computed(() =>
  getLevels().map(level => ({
    id: level.id,
    level: level.levelNumber,
    passRate: `${level.passCriteria}% Pass`,
    totalQuestions: getQuestionsByLevel(level.levelNumber).length,
  }))
)

const authStore = useAuthStore()
</script>

<template>
  <div class="w-full flex flex-col items-center mt-6 px-4 pb-12 font-sans text-black">
    <CardBase class="relative !bg-[#f2f2f2] p-8 md:p-12 w-full max-w-5xl flex flex-col gap-8 rounded-[40px]">
      <div v-if="messageEdit" id="flashMessage"
        class="absolute -top-18 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-6 py-3 bg-orange-500">
        <h4 class="font-bold text-gray-800">{{ messageEdit }}</h4>
      </div>
      <back-home class=" absolute top-5 left-8"/>
      <div class="flex items-center gap-4 mb-2 mt-6">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="size-20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
                </svg>
        <h1 class="text-[54px] font-bold tracking-wide text-black leading-none">Level</h1>
      </div>

      <div class="flex flex-col gap-6 w-full">
        <div 
          v-for="item in levelsData" 
          :key="item.id"
          class="w-full bg-[#e6e6e6] rounded-[30px] p-5 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          
          <div class="bg-[#FCE1B6] text-black font-bold px-6 py-4 rounded-full text-center w-full md:w-[140px] text-sm tracking-wide">
            Level {{ item.level }}
          </div>
          
          <div class="bg-[#D9C8E8] text-black font-bold px-6 py-4 rounded-full text-center w-full md:w-[140px] text-sm tracking-wide">
            {{ item.passRate }}
          </div>
          
          <div class="bg-[#D9C8E8] text-black font-bold px-6 py-2 rounded-full text-center flex flex-col items-center justify-center w-full md:w-[140px] leading-tight">
            <span class="text-[10px] tracking-wide">Total Questions</span>
            <span class="text-lg">{{ item.totalQuestions }}</span>
          </div>
          
          <RouterLink :to="{ name: 'admin-exam-detail', params: { id: authStore.user?.id, level: item.level } }" class="bg-[#A7F3D0] text-black font-bold px-6 py-2 rounded-full text-center flex flex-col items-center justify-center w-full md:w-[130px] leading-tight cursor-pointer hover:brightness-95 transition">
            <span class="text-sm">Exam</span>
            <span class="text-sm">Detail</span>
          </RouterLink>
          
          <RouterLink :to="{ name:'admin-level-detail', params: { id: authStore.user?.id, level: item.level } }" class="bg-[#A7F3D0] text-black font-bold px-6 py-2 rounded-full text-center flex flex-col items-center justify-center w-full md:w-[130px] leading-tight cursor-pointer hover:brightness-95 transition">
            <span class="text-sm">View</span>
            <span class="text-sm">Detail</span>
          </RouterLink>

        </div>
      </div>

    </CardBase>
  </div>
</template>