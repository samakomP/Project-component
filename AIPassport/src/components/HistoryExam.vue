<script setup lang="ts">
import { ref, watch } from 'vue'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import ExamService from '@/services/ExamService'

interface ExamHistoryRaw {
  exam_ID: number
  users_ID: number
  level_ID: number
  score: number
  result: string
  timestamp: string
}

const props = defineProps<{
  userId: number
}>()

function formatDate(dateTime: string) {
  const date = new Date(dateTime)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

interface Attempt {
  id: number
  level: number
  date: string
  passed: boolean
  correctAnswers: number
  wrongAnswers: number
}

const attempts = ref<Attempt[]>([])

async function loadAttempts(userId: number) {
  const historyResponse = await ExamService.getExamHistoryByUser(userId)
  const history = (historyResponse.data as ExamHistoryRaw[])
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  attempts.value = await Promise.all(
    history.map(async entry => {
      const questionsResponse = await ExamService.getQuestionsByLevel(entry.level_ID)
      const totalQuestions = questionsResponse.data.length
      const correctAnswers = totalQuestions > 0
        ? Math.round((entry.score / 100) * totalQuestions)
        : 0

      return {
        id: entry.exam_ID,
        level: entry.level_ID,
        date: formatDate(entry.timestamp),
        passed: entry.result.toUpperCase() === 'PASS',
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
      }
    })
  )
}

watch(() => props.userId, loadAttempts, { immediate: true })
</script>

<template>
  <div class="w-full flex flex-col gap-6">

    <CardBase
      v-for="attempt in attempts"
      :key="attempt.id"
      class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 relative flex flex-col gap-6"
    >
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">

        <PillLevel class="text-xl font-bold">
          Level {{ attempt.level }}
        </PillLevel>

        <div class="text-center md:text-left">
          <span class="text-gray-600 text-sm block">Attempt Time :</span>
          <span class="font-bold text-gray-900 text-base">{{ attempt.date }}</span>
        </div>

        <div
          :class="attempt.passed ? 'bg-[#5BF09F] text-[#003366]' : 'bg-[#FF7A33] text-white'"
          class="font-bold text-xl px-10 py-2 rounded-full shadow-sm text-center"
        >
          {{ attempt.passed ? 'Pass' : 'Fail' }}
        </div>

      </div>

      <div class="flex justify-around items-center border-t border-gray-300 pt-4 text-base">
        <div>
          <span class="text-gray-700">Correct Answer :</span>
          <span class="font-bold text-gray-900 ml-2">{{ attempt.correctAnswers }}</span>
        </div>
        <div>
          <span class="text-gray-700">Wrong Answer :</span>
          <span class="font-bold text-gray-900 ml-2">{{ attempt.wrongAnswers }}</span>
        </div>
      </div>

    </CardBase>

    <p v-if="attempts.length === 0" class="text-center text-gray-500 font-bold text-lg mt-4">
      No exam attempts recorded yet.
    </p>

  </div>
</template>
