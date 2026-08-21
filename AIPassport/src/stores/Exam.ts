import { ref } from 'vue'
import { defineStore } from 'pinia'

import ExamService from '@/services/ExamService'
import LevelService from '@/services/LevelService'

import type { Question, ExamHistory } from '@/types'

import { useUserStore } from '@/stores/user'

const ANSWER_LETTERS = ['A', 'B']

interface QuestionRaw {
  questions_ID: number
  level_ID: number
  questionText: string
  correctAnswer: string
}

interface QuestionOptionRaw {
  option_ID: number
  question_ID: number
  optionText: string
}

interface LevelRaw {
  level_ID: number
  levelNumber: number
  passCriteria: number
}

interface ExamHistoryRaw {
  exam_ID: number
  users_ID: number
  level_ID: number
  score: number
  result: string
  timestamp: string
}

function toExamHistory(raw: ExamHistoryRaw): ExamHistory {
  return {
    id: raw.exam_ID,
    userId: raw.users_ID,
    level: raw.level_ID,
    score: raw.score,
    result: raw.result.toUpperCase() as 'PASS' | 'FAIL',
    dateTime: raw.timestamp,
  }
}

export const useExamStore = defineStore('exam', () => {
  const questions = ref<Question[]>([])
  const answers = ref<Record<number, string>>({})

  const score = ref<number | null>(null)
  const result = ref<'PASS' | 'FAIL' | null>(null)

  const history = ref<ExamHistory[]>([])

  async function startExam(level: number) {
    const [questionsResponse, optionsResponse] = await Promise.all([
      ExamService.getQuestionsByLevel(level),
      ExamService.getQuestionOptions(),
    ])

    questions.value = (questionsResponse.data as QuestionRaw[]).map(raw => ({
      id: raw.questions_ID,
      level: raw.level_ID,
      question: raw.questionText,
      choices: (optionsResponse.data as QuestionOptionRaw[])
        .filter(option => option.question_ID === raw.questions_ID)
        .map(option => option.optionText),
      answer: raw.correctAnswer,
    }))

    answers.value = {}
    score.value = null
    result.value = null
  }

  function setAnswer(questionId: number, answer: string) {
    answers.value[questionId] = answer
  }

  async function submitExam(userId: number, level: number) {
    if (questions.value.length === 0) {
      score.value = 0
    } else {
      const correctCount = questions.value.filter(question => {
        const answerIndex = ANSWER_LETTERS.indexOf(question.answer)
        const correctChoice = question.choices[answerIndex]
        return answers.value[question.id] === correctChoice
      }).length
      score.value = Math.round((correctCount / questions.value.length) * 100)
    }

    const levelResponse = await LevelService.getLevelByNumber(level)
    const passCriteria = (levelResponse.data[0] as LevelRaw).passCriteria

    result.value = score.value >= passCriteria ? 'PASS' : 'FAIL'

    await ExamService.saveExamHistory({
      id: Date.now(),
      exam_ID: Date.now(),
      users_ID: userId,
      level_ID: level,
      score: score.value,
      result: result.value.toLowerCase(),
      timestamp: new Date().toISOString(),
    })

    const historyResponse = await ExamService.getExamHistoryByUser(userId)
    history.value = (historyResponse.data as ExamHistoryRaw[]).map(toExamHistory)

    if (result.value === 'PASS') {
      const userStore = useUserStore()
      const currentUser = userStore.user
      const earnedLevel = Math.min(level + 1, 4)
      if (currentUser && currentUser.id === userId && earnedLevel > currentUser.level) {
        await userStore.updateUserData(userId, { level: earnedLevel })
      }
    }

    return result.value
  }

  async function loadHistory(userId: number) {
    const historyResponse = await ExamService.getExamHistoryByUser(userId)
    history.value = (historyResponse.data as ExamHistoryRaw[]).map(toExamHistory)
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
