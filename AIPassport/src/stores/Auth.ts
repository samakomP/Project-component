import { ref } from 'vue'
import { defineStore } from 'pinia'
import UserService from '@/services/UserService'
import { useUserStore, clearUserOverrides } from '@/stores/user'


export const useAuthStore = defineStore('auth', () => {
  const storedUser = localStorage.getItem('auth_user')
const user = ref<{ id:number; username: string; role: string } | null>(storedUser ? JSON.parse(storedUser) : null)

  function setSession(id: number, username: string, role: string) {
    user.value = { id, username, role }
    localStorage.setItem('auth_user', JSON.stringify(user.value))
  }

  const login = async (username: string, password: string) => {
    const userStore = useUserStore()
    const localAccount = userStore.findLocalAccountByCredentials(username, password)
    if (localAccount) {
      setSession(localAccount.id, localAccount.username, 'user')
      return 'user'
    }

    const response = await UserService.getUserByUsername(username)
    const raw = response.data[0]

    if (!raw || raw.password !== password) {
      return null
    }

    setSession(raw.users_ID, raw.username, raw.role)
    return raw.role
  }

  const register = (username: string, password: string) => {
    const userStore = useUserStore()
    const newAccount = userStore.registerUser(username, password)
    setSession(newAccount.id, newAccount.username, 'user')
    return 'user'
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('auth_user')
    clearUserOverrides()
    useUserStore().user = null
  }

  return { user, login, register, logout }
})
