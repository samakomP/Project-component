export interface Auth {
    username: string
    password: string
}

export interface MessageState {
  message: string
  messageEdit: string
}

export interface EventState {
  event: Event | null
}

export interface User {
  id: number
  username: string
  name: string
  surname: string
  profileImage: string
  province: string
  level: number
  active: boolean
}

export interface Benefit {
  id: number
  level: number
  name: string
  description: string
}

export interface Service {
  id: number
  level: number
  name: string
  description: string
}

export interface Level {
  id: number
  levelNumber: number
  name: string
  passCriteria: number
}

export interface ELearning {
  id: number
  level: number
  title: string
  description: string
  videoUrl: string
}

export interface Question {
  id: number
  level: number
  question: string
  choices: string[]
  answer: string
}

export interface ExamHistory {
  id: number
  userId: number
  level: number
  score: number
  result: 'PASS' | 'FAIL'
  dateTime: string
}

export interface Badge {
  id: number
  name: string
  description: string
}
