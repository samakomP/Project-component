<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import { useUserStore } from '@/stores/user'
import { useExamStore } from '@/stores/Exam'
import { getExamLevel } from '@/services/ExamService'

const ANSWER_LETTERS = ['A', 'B', 'C', 'D']

interface ExamOption {
  letter: string
  text: string
}

interface ExamQuestion {
  id: number
  text: string
  options: ExamOption[]
  selected: string | null
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const examStore = useExamStore()

const currentLevel = computed(() => getExamLevel(route.params.level, user.value?.level))

const questions = ref<ExamQuestion[]>([])
const currentQuestionIndex = ref(0)

function loadQuestions() {
  examStore.startExam(currentLevel.value)
  questions.value = examStore.questions.map(question => ({
    id: question.id,
    text: question.question,
    options: question.choices.map((choice, index) => ({
      letter: ANSWER_LETTERS[index] ?? String(index + 1),
      text: choice,
    })),
    selected: null,
  }))
  currentQuestionIndex.value = 0
}

loadQuestions()
watch(currentLevel, loadQuestions)

const totalQuestions = computed(() => questions.value.length)

const answeredCount = computed(() => {
  return questions.value.filter(q => q.selected !== null).length
})

const progressPercentage = computed(() => {
  return totalQuestions.value === 0 ? 0 : (answeredCount.value / totalQuestions.value) * 100
})

const currentQuestion = computed(() => questions.value[currentQuestionIndex.value])

const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)
const isLastQuestion = computed(() => currentQuestionIndex.value === totalQuestions.value - 1)

const allAnswered = computed(() =>
  totalQuestions.value > 0 && answeredCount.value === totalQuestions.value
)

const selectOption = (letter: string) => {
  const question = questions.value[currentQuestionIndex.value]
  if (!question) return

  question.selected = letter
  const option = question.options.find(o => o.letter === letter)
  if (option) examStore.setAnswer(question.id, option.text)
}

const prevQuestion = () => {
  if (!isFirstQuestion.value) {
    currentQuestionIndex.value--
  }
}

const nextQuestion = () => {
  if (!isLastQuestion.value) {
    currentQuestionIndex.value++
  } else if (allAnswered.value) {
    submitExam()
  }
}

const goToQuestion = (index: number) => {
  currentQuestionIndex.value = index
}

function submitExam() {
  if (!user.value) return

  examStore.submitExam(user.value.id, currentLevel.value)
  router.push({ name: 'user-history-view', params: { id: user.value.id } })
}

function quitExam() {
  router.push({ name: 'exam-view', params: route.params })
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-4 px-4 pb-12 font-serif text-black">
    <CardBase class="p-8 md:p-12 w-full max-w-5xl flex flex-col gap-6 relative">

      <div class="flex justify-between items-start w-full">
        <PillLevel class="text-2xl font-bold px-10 py-2">
          Level {{ currentLevel }}
        </PillLevel>

        <button @click="quitExam" class="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
          <div class="flex flex-col text-[#812000] font-bold text-xl leading-5 text-right">
            <span>Quit</span>
            <span>Exam</span>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="#cc3300" class="w-10 h-10">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" class="rotate-180 origin-center" />
          </svg>
        </button>
      </div>

      <div class="w-full max-w-xl mx-auto flex flex-col items-center mt-2 mb-4">
        <span class="text-sm font-bold font-sans mb-2">Answered &nbsp; {{ answeredCount }} / {{ totalQuestions }}</span>
        <div class="w-full h-4 bg-[#dcdcdc] rounded-full overflow-hidden">
          <div
            class="h-full bg-[#5BF09F] transition-all duration-300"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
        <span class="text-xs font-sans text-gray-400 mt-1">Progress</span>
      </div>

      <div v-if="currentQuestion" class="flex flex-col md:flex-row gap-8 w-full items-stretch">

        <div class="flex flex-col flex-1 gap-6">
          <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-8 md:p-12 flex flex-col items-center">
            <h2 class="text-2xl font-bold mb-4">Question {{ currentQuestionIndex + 1 }}</h2>
            <h1 class="text-3xl font-bold font-sans mb-8 text-center">{{ currentQuestion.text }}</h1>

            <div class="w-full max-w-md flex flex-col gap-3">
              <div
                v-for="option in currentQuestion.options"
                :key="option.letter"
                @click="selectOption(option.letter)"
                :class="[
                  'w-full px-5 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors duration-200 font-sans text-sm font-bold',
                  currentQuestion.selected === option.letter ? 'bg-[#8faadc] text-black' : 'bg-[#dcdcdc] text-black hover:bg-[#d0d0d0]'
                ]"
              >
                <span>{{ option.letter }}.</span>
                <span>{{ option.text }}</span>
              </div>
            </div>
          </CardBase>

          <div class="flex justify-between w-full px-4 md:px-12 mt-2">
            <button
              @click="prevQuestion"
              :class="[
                'bg-[#dcdcdc] text-[#003366] font-bold text-xl px-10 py-3 rounded-full transition tracking-wide',
                isFirstQuestion ? 'opacity-0 pointer-events-none' : 'hover:brightness-95 cursor-pointer'
              ]"
            >
              Previous
            </button>
            <button
              @click="nextQuestion"
              :disabled="isLastQuestion && !allAnswered"
              :class="[
                'font-bold text-xl px-12 py-3 rounded-full transition tracking-wide',
                isLastQuestion && !allAnswered
                  ? 'bg-[#5BF09F]/50 text-[#003366]/50 cursor-not-allowed'
                  : 'bg-[#5BF09F] text-[#003366] hover:brightness-95 cursor-pointer'
              ]"
            >
              {{ isLastQuestion ? 'Submit' : 'Next' }}
            </button>
          </div>
        </div>

        <CardBase class="!bg-[#e6e6e6] !rounded-[40px] !shadow-none p-6 md:p-8 flex flex-col items-center w-full md:w-56 shrink-0 h-fit">
          <h2 class="text-2xl font-bold mb-6">Question</h2>
          <div class="flex flex-col w-full gap-4">
            <button
              v-for="(q, index) in questions"
              :key="q.id"
              @click="goToQuestion(index)"
              :class="[
                'w-full py-2 rounded-xl font-bold text-xl transition-colors duration-200',
                currentQuestionIndex === index ? 'bg-[#fbc58b] text-black' : 'bg-[#b3b3b3] text-black hover:bg-[#a0a0a0]'
              ]"
            >
              Q{{ index + 1 }}
            </button>
          </div>
        </CardBase>

      </div>
    </CardBase>
  </div>
</template>
