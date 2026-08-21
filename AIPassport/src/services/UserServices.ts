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
    getServices() {
        return apiClient.get(`/Services`)
    }
    ,
    getServicesByLevel(level: number) {
        return apiClient.get(`/Services?level_ID_lte=${level}`)
    },
    getBenefits() {
        return apiClient.get(`/Benefits`)
    },
    getBenefitsByLevel(level: number) {
        return apiClient.get(`/Benefits?level_ID_lte=${level}`)
    }
}
