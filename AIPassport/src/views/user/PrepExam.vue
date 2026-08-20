<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import { useUserStore } from '@/stores/user'
import { getQuestionsByLevel, getExamHistoryByUser } from '@/services/ExamService'
import { getPassCriteria } from '@/services/LevelService'

const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentLevel = computed(() => Number(route.params.level) || user.value?.level || 3)

const totalQuestions = computed(() => getQuestionsByLevel(currentLevel.value).length)
const passScore = computed(() => getPassCriteria(currentLevel.value))

const lastAttempt = computed(() => {
  if (!user.value) return null

  const attempts = getExamHistoryByUser(user.value.id)
    .filter(entry => entry.level === currentLevel.value)
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())

  const latest = attempts[0]
  if (!latest) return null

  return {
    status: latest.result === 'PASS' ? 'Pass(✓)' : 'Fail(X)',
    score: latest.score,
    date: formatDate(latest.dateTime),
  }
})

const instructions = computed(() => {
  const list = [
    `Answer ${totalQuestions.value} multiple choice questions`,
    `You need to score at least ${passScore.value}% to pass`,
    'You can review your answers before submitting',
    'Once submitted, your score will be recorded',
  ]

  if (lastAttempt.value?.status === 'Pass(✓)') {
    list.push('You have already passed this exam')
  }

  return list
})

function formatDate(dateTime: string) {
  const date = new Date(dateTime)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-4 px-4 pb-12 font-serif text-black">
    <CardBase class="p-8 md:p-12 w-full max-w-5xl flex flex-col gap-10">
      <div class="flex flex-col md:flex-row gap-12 w-full">

        <div class="w-full md:w-1/3 flex flex-col items-center md:items-start gap-6">
          <div class="flex justify-center w-full">
            <PillLevel class="text-2xl font-bold px-10 py-2">
              Level {{ currentLevel }}
            </PillLevel>
          </div>

          <h2 class="text-3xl font-bold w-full text-center md:text-center mt-2">Instruction</h2>

          <ul class="text-sm font-bold flex flex-col gap-3 list-disc pl-5 pr-2">
            <li v-for="(instruction, index) in instructions" :key="index">
              {{ instruction }}
            </li>
          </ul>
        </div>

        <div class="w-full md:w-2/3 flex flex-col gap-6">
          <h1 class="text-5xl font-bold text-center mb-2 tracking-wide">EXAM HUB</h1>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col items-center justify-center aspect-square text-center">
              <span class="text-xl font-bold mb-3">Total<br>Question</span>
              <span class="text-4xl font-bold">{{ totalQuestions }}</span>
            </CardBase>

            <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex items-center justify-center aspect-square gap-2">
              <span class="text-6xl font-bold">NO</span>
              <div class="flex flex-col text-[10px] font-bold text-left leading-tight mt-1">
                <span>Limit Time</span>
                <span>Limit attempt</span>
              </div>
            </CardBase>

            <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col items-center justify-center aspect-square text-center">
              <span class="text-xl font-bold mb-3">Pass score</span>
              <span class="text-4xl font-bold">{{ passScore }}%</span>
            </CardBase>
          </div>

          <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col gap-4 mt-2 min-h-[140px] justify-center">
            <h3 class="text-2xl font-bold text-center">Last attempt</h3>

            <div v-if="lastAttempt" class="flex justify-between items-center text-center px-2 md:px-8 mt-2">
              <div class="flex flex-col gap-1">
                <span class="text-base font-bold">Status</span>
                <span class="text-2xl font-bold">{{ lastAttempt.status }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base font-bold">Score</span>
                <span class="text-2xl font-bold">{{ lastAttempt.score }} %</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-base font-bold">Date</span>
                <span class="text-2xl font-bold">{{ lastAttempt.date }}</span>
              </div>
            </div>

            <div v-else class="text-center text-gray-500 font-bold text-lg mt-2">
              No previous attempts recorded.
            </div>
          </CardBase>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <button class="bg-[#5BF09F] text-[#003366] font-bold text-2xl md:text-3xl px-14 py-4 rounded-full hover:brightness-95 transition tracking-wide cursor-pointer">
          Start Exam
        </button>
      </div>
    </CardBase>
  </div>
</template>
