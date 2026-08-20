import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types'
import {
  getUsers,
  getUserById,
  updateUser,
  deactivateUser,
} from '@/services/UserService'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>(getUsers())

  const user = ref<User | null>(null)

  function setUser(userId: number) {
    user.value = getUserById(userId) ?? null
  }

  function updateUserData(id: number, data: Partial<User>) {
    updateUser(id, data)
    users.value = getUsers()

    if (user.value?.id === id) {
      user.value = getUserById(id) ?? null
    }
  }

  function deactivateUserById(id: number) {
    deactivateUser(id)
    users.value = getUsers()
  }

  return {
    users,
    user,
    setUser,
    updateUserData,
    deactivateUserById,
  }
})