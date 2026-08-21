<script setup lang="ts">
import { ref, watch } from 'vue'
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

const props = defineProps<{
  userId: number
}>()

const user = ref<User | undefined>()

watch(
  () => props.userId,
  (id) => {
    UserService.getUserById(id).then((response) => {
      user.value = response.data.map((raw: UserRaw): User => ({
        id: raw.users_ID,
        username: raw.username,
        name: raw.FName,
        surname: raw.LName,
        profileImage: raw.profileImg,
        province: raw.province,
        level: raw.level_ID,
        active: raw.isActivate,
      }))[0]
    })
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 text-lg">
    <p><span class="text-gray-700">First name :</span> <span class="font-bold text-gray-900">{{ user.name }}</span></p>
    <p><span class="text-gray-700">Last name :</span> <span class="font-bold text-gray-900">{{ user.surname }}</span></p>
    <p><span class="text-gray-700">Email :</span> <span class="font-bold text-gray-900">{{ user.username }}@gmail.com</span></p>
    <p><span class="text-gray-700">Province :</span> <span class="font-bold text-gray-900">{{ user.province }}</span></p>
  </div>
</template>
