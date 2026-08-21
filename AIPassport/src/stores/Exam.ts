import { ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getQuestionsByLevel,
  calculateScore,
  saveExamHistory,
  getExamHistoryByUser,
} from '@/services/ExamService'

import { getPassCriteria } from '@/services/LevelService'

import type { Question, ExamHistory } from '@/types'

import { useAuthStore } from '@/stores/Auth'

export const useExamStore = defineStore('exam', () => {
  const questions = ref<Question[]>([])
  const answers = ref<Record<number, string>>({})

  const score = ref<number | null>(null)
  const result = ref<'PASS' | 'FAIL' | null>(null)

  const history = ref<ExamHistory[]>([])

  function startExam(level: number) {
    questions.value = getQuestionsByLevel(level)

    answers.value = {}
    score.value = null
    result.value = null
  }

  function setAnswer(questionId: number, answer: string) {
    answers.value[questionId] = answer
  }

  function submitExam(userId: number, level: number) {
    score.value = calculateScore(answers.value, level)

    const passCriteria = getPassCriteria(level)

    if (calculateScore.value >= passCriteria) {
      result.value = 'PASS'
    } else {
      result.value = 'FAIL'
    }

    const record: ExamHistory = {
      id: Date.now(),
      userId: userId,
      level: level,
      score: score.value,
      result: result.value,
      dateTime: new Date().toISOString(),
    }

    saveExamHistory(record)
    history.value = getExamHistoryByUser(userId)

    if (result.value === 'PASS') {
      const authStore = useAuthStore()
      if (authStore.user) {
        if (authStore.user.id === userId) {
          authStore.upgradeLevel()
        }
      }
    }

    return result.value
  }

  function loadHistory(userId: number) {
    history.value = getExamHistoryByUser(userId)
  }

  return {
    questions,
    answers,
    score,
    result,
    history,
    startExam,
    setAnswer,
    submitExam,
    loadHistory,
  }
})
