import axios from 'axios'

const apiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/Prototean/Project-331-Learning',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getELearningByLevel(level: number) {
        return apiClient.get(`/e_learning?level_ID=${level}`)
    }
}
