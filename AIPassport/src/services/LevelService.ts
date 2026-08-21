import axios from 'axios'

const apiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/BlackShima/db_for_project_component',
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
})

export default {
    getLevels() {
        return apiClient.get('/Levels')
    },
    getLevelByNumber(levelNumber: number) {
        return apiClient.get(`/Levels?levelNumber=${levelNumber}`)
    }
}
