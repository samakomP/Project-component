import { questions } from '@/mock/questions'
import { questionsOptions } from '@/mock/questionsOptions'
import { ExamHistory as examHistoryRecords } from '@/mock/ExamHistory'
import type { Question, ExamHistory } from '@/types'

const ANSWER_LETTERS = ['A', 'B', 'C', 'D']

function toQuestion(raw: (typeof questions)[number]): Question {
  const choices = questionsOptions
    .filter(option => option.question_ID === raw.questions_ID)
    .map(option => option.optionText)

  return {
    id: raw.questions_ID,
    level: raw.level_ID,
    question: raw.questionText,
    choices,
    answer: raw.correctAnswer,
  }
}

export function getExamLevel(routeLevel: unknown, userLevel?: number): number {
  return Number(routeLevel) || userLevel || 3
}

export function getQuestionsByLevel(level: number): Question[] {
  return questions
    .filter(question => question.level_ID === level)
    .map(toQuestion)
}

export function calculateScore(answers: Record<number, string>, level: number): number {
  const levelQuestions = getQuestionsByLevel(level)
  if (levelQuestions.length === 0) return 0

  const correctCount = levelQuestions.filter(question => {
    const answerIndex = ANSWER_LETTERS.indexOf(question.answer)
    const correctChoice = question.choices[answerIndex]
    return answers[question.id] === correctChoice
  }).length

  return Math.round((correctCount / levelQuestions.length) * 100)
}

export function saveExamHistory(record: ExamHistory) {
  examHistoryRecords.push({
    exam_ID: record.id,
    users_ID: record.userId,
    level_ID: record.level,
    score: record.score,
    result: record.result.toLowerCase(),
    timestamp: record.dateTime,
  })
}

export function getExamHistoryByUser(userId: number): ExamHistory[] {
  return examHistoryRecords
    .filter(entry => entry.users_ID === userId)
    .map(entry => ({
      id: entry.exam_ID,
      userId: entry.users_ID,
      level: entry.level_ID,
      score: entry.score,
      result: entry.result.toUpperCase() as 'PASS' | 'FAIL',
      dateTime: entry.timestamp,
    }))
}
