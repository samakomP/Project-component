import { ref, computed } from 'vue'
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

  const currentUser = ref<User | null>(null)

  function setCurrentUser(userId: number) {
    currentUser.value = getUserById(userId) ?? null
  }

  function updateUserData(id: number, data: Partial<User>) {
    updateUser(id, data)
    users.value = getUsers()

    if (currentUser.value?.id === id) {
      currentUser.value = getUserById(id) ?? null
    }
  }

  function deactivateUserById(id: number) {
    deactivateUser(id)
    users.value = getUsers()
  }

  return {
    users,
    currentUser,
    setCurrentUser,
    updateUserData,
    deactivateUserById,
  }
})