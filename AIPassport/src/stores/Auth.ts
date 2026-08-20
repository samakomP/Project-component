import { ref } from 'vue'
import { defineStore } from 'pinia'


export const useAuthStore = defineStore('auth', () => {
  const storedUser = localStorage.getItem('auth_user')
const user = ref<{ users_ID:number; username: string; role: string } | null>(storedUser ? JSON.parse(storedUser) : null)
  const login = async (username: string) => {

    
    if (username === 'Admin1') {
      user.value = { users_ID:1, username: username, role: 'admin' }
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      return 'admin'
    }
    else if (username === 'user1' || username === 'user2') {
      user.value = { users_ID:2, username: username, role: 'user' }
      localStorage.setItem('auth_user', JSON.stringify(user.value))
      return 'user'
    }
    
    return null
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_user')
  }

  return { user, login, logout }
})