<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'
import { useExamStore } from '@/stores/Exam'
import { getExamLevel } from '@/services/ExamService'
import { getPassCriteria } from '@/services/LevelService'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const examStore = useExamStore()

const currentLevel = computed(() => getExamLevel(route.params.level, user.value?.level))

const score = computed(() => examStore.score ?? 0)
const requiredScore = computed(() => getPassCriteria(currentLevel.value))
const isPass = computed(() => examStore.result === 'PASS')

const goHome = () => {
  router.push({ name: 'userhome-view', params: { id: user.value?.id } })
}

const handleAction = () => {
  if (isPass.value) {
    router.push({ name: 'user-history-view', params: { id: user.value?.id } })
  } else {
    router.push({ name: 'exam-view', params: { id: user.value?.id, level: currentLevel.value } })
  }
}
</script>

<template>
  <!--
    Safe to edit below: class strings (colors, sizes, spacing, layout) and static text.
    Do NOT touch: @click handlers, {{ }} bindings, :class conditions, v-if/v-else —
    those are wired to real score/pass-fail/routing logic in <script setup> above.
  -->
  <div class="w-full flex flex-col items-center mt-8 px-4 pb-12 font-serif text-black">

    <CardBase class="relative p-10 pb-28 md:p-16 md:pb-32 w-full max-w-4xl flex flex-col items-center gap-14">

      <!-- Pass/Fail status pill. Text and color driven by isPass — edit the two class strings, not the ternary itself -->
      <div
        class="mx-auto w-fit px-24 py-4 rounded-full text-6xl font-bold tracking-wide text-center"
        :class="isPass ? 'bg-[#5BF09F] text-[#591c0b]' : 'bg-[#fa995a] text-[#591c0b]'"
      >
        {{ isPass ? 'Pass' : 'Fail' }}
      </div>

      <!-- Score vs required-score pills. {{ score }} / {{ requiredScore }} are real numbers from the store — leave as is -->
      <div class="flex flex-col md:flex-row justify-between w-full max-w-2xl gap-15 md:gap-22 my-14">
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

      <!--
        Action buttons, pinned to the bottom corners of the card on md+ screens
        (Home = bottom-left, History/Retry = bottom-right); stacked normally on mobile.
        goHome/handleAction navigate via real router names — keep the @click attributes as they are.
      -->
      <div class="w-full flex flex-col gap-4 md:block font-sans">
        <button
          @click="goHome"
          class="bg-[#FCC084] text-[#003366] font-bold text-3xl px-16 py-3 rounded-full hover:brightness-95 transition tracking-wide w-full md:w-auto md:absolute md:bottom-8 md:left-8"
        >
          HOME
        </button>

        <!-- handleAction goes to History on pass, back to the exam on fail (retry) — label follows isPass automatically -->
        <button
          @click="handleAction"
          class="bg-[#d4b3ff] text-[#003366] font-bold text-3xl px-16 py-3 rounded-full hover:brightness-95 transition tracking-wide w-full md:w-auto md:absolute md:bottom-8 md:right-8"
        >
          {{ isPass ? 'History' : 'Retry' }}
        </button>
      </div>

    </CardBase>

  </div>
</template>
