<script setup lang="ts">
import { computed } from 'vue'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import { getExamHistoryByUser, getQuestionsByLevel } from '@/services/ExamService'

const props = defineProps<{
  userId: number
}>()

function formatDate(dateTime: string) {
  const date = new Date(dateTime)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}-${month}-${date.getFullYear()}`
}

const attempts = computed(() =>
  getExamHistoryByUser(props.userId)
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    .map(entry => {
      const totalQuestions = getQuestionsByLevel(entry.level).length
      const correctAnswers = totalQuestions > 0
        ? Math.round((entry.score / 100) * totalQuestions)
        : 0

      return {
        id: entry.id,
        level: entry.level,
        date: formatDate(entry.dateTime),
        passed: entry.result === 'PASS',
        correctAnswers,
        wrongAnswers: totalQuestions - correctAnswers,
      }
    })
)
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
