import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '@/types'
import UserService from '@/services/UserService'

interface UserRaw {
  users_ID: number
  username: string
  FName: string
  LName: string
  province: string
  profileImg: string
  isActivate: boolean
  level_ID: number
}

function toUser(raw: UserRaw): User {
  return {
    id: raw.users_ID,
    username: raw.username,
    name: raw.FName,
    surname: raw.LName,
    profileImage: raw.profileImg,
    province: raw.province,
    level: raw.level_ID,
    active: raw.isActivate,
  }
}

interface LocalAccount extends User {
  password: string
}

const LOCAL_ACCOUNTS_KEY = 'local_registered_users'

function getLocalAccounts(): LocalAccount[] {
  const raw = localStorage.getItem(LOCAL_ACCOUNTS_KEY)
  return raw ? JSON.parse(raw) : []
}

function saveLocalAccounts(accounts: LocalAccount[]) {
  localStorage.setItem(LOCAL_ACCOUNTS_KEY, JSON.stringify(accounts))
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])

  const user = ref<User | null>(null)

  async function setUser(userId: number) {
    const localAccount = getLocalAccounts().find(a => a.id === userId)
    if (localAccount) {
      user.value = localAccount
      return
    }
    const response = await UserService.getUserById(userId)
    user.value = response.data.map(toUser)[0] as User
  }

  function registerUser(username: string, password: string): User {
    const accounts = getLocalAccounts()
    const newAccount: LocalAccount = {
      id: Date.now(),
      username,
      password,
      name: '',
      surname: '',
      profileImage: '',
      province: '',
      level: 1,
      active: true,
    }
    accounts.push(newAccount)
    saveLocalAccounts(accounts)
    user.value = newAccount
    return newAccount
  }

  function findLocalAccountByCredentials(username: string, password: string): User | undefined {
    return getLocalAccounts().find(a => a.username === username && a.password === password)
  }

  async function updateUserData(id: number, data: Partial<User>) {
    if (user.value?.id === id) {
      user.value = { ...user.value, ...data }
    }
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...data }
    }
  }

  async function deactivateUserById(id: number) {
    await updateUserData(id, { active: false })
  }

  return {
    users,
    user,
    setUser,
    registerUser,
    findLocalAccountByCredentials,
    updateUserData,
    deactivateUserById,
  }
})
