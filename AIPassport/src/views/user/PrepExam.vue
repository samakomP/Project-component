<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import StatTile from '@/components/StatTile.vue'
import AttemptField from '@/components/AttemptField.vue'
import BackHome from '@/components/BackHome.vue'
import { useUserStore } from '@/stores/user'
import ExamService, { getExamLevel } from '@/services/ExamService'
import LevelService from '@/services/LevelService'

interface LevelRaw {
  level_ID: number
  levelNumber: number
  passCriteria: number
}

const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentLevel = computed(() => getExamLevel(route.params.level, user.value?.level))

const totalQuestions = ref(0)
const passScore = ref(0)

watch(
  currentLevel,
  (level) => {
    ExamService.getQuestionsByLevel(level).then((response) => {
      totalQuestions.value = response.data.length
    })
    LevelService.getLevelByNumber(level).then((response) => {
      passScore.value = (response.data[0] as LevelRaw).passCriteria
    })
  },
  { immediate: true }
)

interface LastAttempt {
  status: string
  score: number
  date: string
}

interface ExamHistoryRaw {
  exam_ID: number
  users_ID: number
  level_ID: number
  score: number
  result: string
  timestamp: string
}

const lastAttempt = ref<LastAttempt | null>(null)

watch(
  [currentLevel, user],
  ([level, currentUser]) => {
    ExamService.getExamHistoryByUser(currentUser!.id).then((response) => {
      const attempts = (response.data as ExamHistoryRaw[])
        .filter(entry => entry.level_ID === level)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

      const latest = attempts[0]
      lastAttempt.value = latest
        ? {
            status: latest.result.toUpperCase() === 'PASS' ? 'Pass(✓)' : 'Fail(X)',
            score: latest.score,
            date: formatDate(latest.timestamp),
          }
        : null
    })
  },
  { immediate: true }
)

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
    <CardBase class="relative p-8 md:p-12 w-full max-w-5xl flex flex-col gap-10">
      <div class="flex flex-col md:flex-row gap-12 w-full">
        <back-home class="absolute -top-3 -left-8"/>
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
            <StatTile :value="totalQuestions">Total<br>Question</StatTile>

            <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex justify-center aspect-square gap-2 relative">
              <span class="absolute left-2 top-15 text-5xl font-bold">NO</span>
              <div class="absolute right-1 top-17 grid-cols-2 flex flex-col text-[12px] font-bold text-left leading-tight mt-1">
                <span>Limit Time</span>
                <span>Limit attempt</span>
              </div>
            </CardBase>

            <StatTile :value="`${passScore}%`" class="items-center justify-center mx-auto font-extrabold">Pass score</StatTile>
          </div>

          <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col gap-4 mt-2 min-h-[140px] justify-center">
            <h3 class="text-2xl font-bold text-center">Last attempt</h3>

            <div v-if="lastAttempt" class="flex justify-between items-center text-center px-2 md:px-8 mt-2">
              <AttemptField label="Status" :value="lastAttempt.status" />
              <AttemptField label="Score" :value="`${lastAttempt.score} %`" />
              <AttemptField label="Date" :value="lastAttempt.date" />
            </div>

            <div v-else class="text-center text-gray-500 font-bold text-lg mt-2">
              No previous attempts recorded.
            </div>
          </CardBase>
        </div>
      </div>

      <div class="flex justify-center mt-6">
        <RouterLink
          :to="{ name: 'take-exam-view', params: { id: user?.id, level: currentLevel } }"
          class="bg-[#5BF09F] text-[#003366] font-bold text-2xl md:text-3xl px-14 py-4 rounded-full hover:brightness-95 transition tracking-wide cursor-pointer"
        >
          Start Exam
        </RouterLink>
      </div>
    </CardBase>
  </div>
</template>
