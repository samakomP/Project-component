import axios, { type AxiosResponse } from 'axios'

const apiClient = axios.create({
    baseURL:'https://my-json-server.typicode.com/Prototean/Project-331-Username',
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
    getUser(id: number | string): Promise<AxiosResponse>{
        return apiClient.get(`/Users?users_ID=${id}`)
    },
    
}
