<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import { getQuestionsByLevel } from '@/services/ExamService'
import { useMessageStore } from '@/stores/message'

const messageStore = useMessageStore();

const ANSWER_LETTERS = ['A', 'B', 'C', 'D']

const route = useRoute()
const router = useRouter()

const level = computed(() => Number(route.params.level))

const questions = ref(
  getQuestionsByLevel(level.value).map((question, index) => ({
    id: question.id,
    number: index + 1,
    text: question.question,
    answer: question.answer,
    choices: question.choices.map((choice, choiceIndex) => ({
      letter: ANSWER_LETTERS[choiceIndex] ?? String(choiceIndex + 1),
      text: choice,
    })),
  }))
)

const goBack = () => {
    router.push({ name: 'admin-level', params: { id: route.params.id } })
}

const handleAddExam = () => {
  console.log('Add Exam Clicked')
  messageStore.updateMessageEdit('Exam was Added!')
  setTimeout(() => {
    messageStore.resetMessageEdit()
  }, 3000)

 router.push({ name: 'admin-level', params: { id: route.params.id } })
}


</script>

<template>
  <div class="w-full flex flex-col items-center mt-12 px-4 pb-12 font-sans text-black">
    <div class="relative w-full max-w-5xl mt-6">
      
      <button 
        @click="goBack" 
        class="absolute -top-7 left-8 bg-[#5BF09F] text-[#003366] font-bold text-[22px] px-12 py-3 rounded-[30px] z-10 hover:brightness-95 transition shadow-sm tracking-wide"
      >
        Back
      </button>

      <CardBase class="!bg-[#f2f2f2] p-10 md:p-14 w-full flex flex-col gap-10 rounded-[40px] pt-16 relative">
        
        <div class="flex flex-col md:flex-row justify-between items-start w-full gap-6">
          
          <div class="flex items-center gap-6 mt-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#233237" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-[72px] h-[72px] shrink-0">
              <rect x="3" y="3" width="18" height="18" rx="2.5"></rect>
              <rect x="7" y="7" width="3.5" height="3.5" stroke-width="2"></rect>
              <path d="M13 9h4"></path>
              <path d="M7 13h10"></path>
              <path d="M6.5 17.5l2 2 3-3"></path>
              <path d="M15 16.5l3 3m0-3l-3 3"></path>
            </svg>
            <h1 class="text-[56px] font-black tracking-wide text-black leading-none">
              EXAM Detail
            </h1>
          </div>

          <div class="flex flex-col items-end gap-8 pr-2">
            <div class="bg-[#FCE1B6] text-black font-bold px-8 py-3 rounded-full text-center text-sm tracking-wide min-w-[120px]">
              Level {{ level }}
            </div>
            
            <button 
              @click="handleAddExam"
              class="bg-[#5BF09F] text-black font-serif font-bold text-xl px-6 py-3 rounded-full hover:brightness-95 transition whitespace-nowrap"
            >
              Add Exam
            </button>
          </div>
          
        </div>

        <div class="flex flex-col gap-8 w-full mt-4">
          <div 
            v-for="question in questions" 
            :key="question.id"
            class="w-full bg-[#e6e6e6] rounded-[30px] p-8 md:p-12 flex flex-col gap-6"
          >
            <h3 class="text-[22px] font-bold font-serif tracking-wide">
              Question {{ question.number }}: {{ question.text }}
            </h3>

            <div class="pl-4 md:pl-8 flex flex-col gap-8 mt-2">
              <span class="text-[20px] font-bold font-serif tracking-wide">
                choices
              </span>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-y-12 gap-x-8 pl-8 md:pl-20">
                <div
                  v-for="choice in question.choices"
                  :key="choice.letter"
                  @click="question.answer = choice.letter"
                  class="text-[18px] font-bold font-serif cursor-pointer transition-colors duration-200"
                  :class="choice.letter === question.answer ? 'text-[#0a8a4a]' : 'hover:text-gray-500'"
                >
                  {{ choice.letter }}. {{ choice.text }}
                  <span v-if="choice.letter === question.answer" class="text-sm ml-1">(correct)</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </CardBase>
    </div>
  </div>
</template>