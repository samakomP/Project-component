import axios from 'axios'

const apiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/BlackShima/db_for_project_component',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

const historyApiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/Prototean/Project-331-Learning',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export function getExamLevel(routeLevel: unknown, userLevel?: number): number {
  return Number(routeLevel) || userLevel || 3
}

export default {
    getQuestionsByLevel(level: number) {
        return apiClient.get(`/Questions?level_ID=${level}`)
    },
    getQuestionOptions() {
        return apiClient.get('/QuestionsOptions')
    },
    saveExamHistory(record: {
        id: number
        exam_ID: number
        users_ID: number
        level_ID: number
        score: number
        result: string
        timestamp: string
    }) {
        return historyApiClient.post('/ExamHistory', record)
    },
    getExamHistoryByUser(userId: number) {
        return historyApiClient.get(`/ExamHistory?users_ID=${userId}`)
    }
}
