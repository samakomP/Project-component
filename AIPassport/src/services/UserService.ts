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
    getUsers() {
        return apiClient.get('/Users')
    },
    getUserById(id: number) {
        return apiClient.get(`/Users?users_ID=${id}`)
    },
    getUserByUsername(username: string) {
        return apiClient.get(`/Users?username=${username}`)
    }
}
