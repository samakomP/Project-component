import { users } from '@/mock/users'
import type { User } from '@/types'

function toUser(raw: (typeof users)[number]): User {
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

export function getUsers(): User[] {
  return users.map(toUser)
}

export function getUserById(id: number): User | undefined {
  const raw = users.find(u => u.users_ID === id)
  return raw ? toUser(raw) : undefined
}

export function updateUser(id: number, data: Partial<User>) {
  const raw = users.find(u => u.users_ID === id)
  if (!raw) return

  if (data.name !== undefined) raw.FName = data.name
  if (data.surname !== undefined) raw.LName = data.surname
  if (data.province !== undefined) raw.province = data.province
}

export function deactivateUser(id: number) {
  const raw = users.find(u => u.users_ID === id)
  if (raw) raw.isActivate = false
}

export function activateUser(id: number) {
  const raw = users.find(u => u.users_ID === id)
  if (raw) raw.isActivate = true
}
