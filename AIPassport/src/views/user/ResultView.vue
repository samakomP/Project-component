<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import CardBase from '@/components/CardBase.vue'

const router = useRouter()

const score = ref(100) 
const requiredScore = ref(75)

const isPass = computed(() => score.value >= requiredScore.value)

const goHome = () => {
  router.push({ name: 'home' }) 
}

const handleAction = () => {
  if (isPass.value) {
    router.push({ name: 'history-exam-view' }) 
  } else {
    router.push({ name: 'prep-exam-view' }) 
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-8 px-4 pb-12 font-serif text-black">
    
    <CardBase class="p-10 md:p-16 w-full max-w-4xl flex flex-col items-center gap-14 relative">
      <div 
        :class="[
          'text-6xl font-bold px-24 py-4 rounded-full tracking-wide',
          isPass ? 'bg-[#5BF09F] text-[#591c0b]' : 'bg-[#fa995a] text-[#591c0b]'
        ]"
      >
        {{ isPass ? 'Pass' : 'Fail' }}
      </div>


      <div class="flex flex-col md:flex-row justify-between w-full max-w-2xl gap-8 mt-2">
        
        <div class="flex flex-col items-center gap-6 w-full">
          <h2 class="text-3xl font-bold tracking-wide">Your Score</h2>
          <div class="bg-[#dcdcdc] text-[#591c0b] text-6xl font-bold px-12 py-5 rounded-full w-full text-center">
            {{ score }}%
          </div>
        </div>

        <div class="flex flex-col items-center gap-6 w-full">
          <h2 class="text-3xl font-bold tracking-wide">Required</h2>
          <div class="bg-[#dcdcdc] text-[#591c0b] text-6xl font-bold px-12 py-5 rounded-full w-full text-center">
            {{ requiredScore }}%
          </div>
        </div>

      </div>
      <div class="flex flex-col md:flex-row justify-between w-full max-w-2xl gap-6 mt-8">
        <button 
          @click="goHome"
          class="bg-[#FCC084] text-[#003366] font-bold text-3xl px-16 py-3 rounded-full hover:brightness-95 transition tracking-wide w-full md:w-auto"
        >
          HOME
        </button>

        <button 
          @click="handleAction"
          class="bg-[#d4b3ff] text-[#003366] font-bold text-3xl px-16 py-3 rounded-full hover:brightness-95 transition tracking-wide w-full md:w-auto"
        >
          {{ isPass ? 'History' : 'Retry' }}
        </button>
      </div>

    </CardBase>
    
  </div>
</template>