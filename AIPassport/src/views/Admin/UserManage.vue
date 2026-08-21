<script setup lang="ts">
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import UserService from '@/services/UserService'
import type { User } from '@/types'

const route = useRoute()
const router = useRouter()

interface UserRow {
  id: number
  name: string
  email: string
  level: number
  status: 'Active' | 'Inactive'
  province: string
}

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

const allUsers = ref<User[]>([])
const users = ref<UserRow[]>([])
const totalUsers = ref(0)

onMounted(() => {
  UserService.getUsers().then((response) => {
    allUsers.value = response.data.map((raw: UserRaw): User => ({
      id: raw.users_ID,
      username: raw.username,
      name: raw.FName,
      surname: raw.LName,
      profileImage: raw.profileImg,
      province: raw.province,
      level: raw.level_ID,
      active: raw.isActivate,
    }))
  })
})

const goBack = () => {
    router.push({ name: 'admin-home-view', params: { id: route.params.id } })
}

const goToUserProfile = (userId: number) => {
  router.push({ name: 'admin-user-detail', params: { id: route.params.id, userId } })
}

const page = computed(() => {
  return Number(route.query.page) || 1
})

const levelFilter = computed(() => route.query.level ? Number(route.query.level) : null)
const provinceFilter = computed(() => (route.query.province as string) || null)

const levelOptions = computed(() =>
  Array.from(new Set(allUsers.value.map(user => user.level))).sort((a, b) => a - b)
)

const provinceOptions = computed(() =>
  Array.from(new Set(allUsers.value.map(user => user.province))).sort()
)

function setLevelFilter(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  router.push({
    name: 'admin-management',
    params: { id: route.params.id },
    query: { ...route.query, level: value || undefined, page: 1 },
  })
}

function setProvinceFilter(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  router.push({
    name: 'admin-management',
    params: { id: route.params.id },
    query: { ...route.query, province: value || undefined, page: 1 },
  })
}

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalUsers.value / 3)
  return page.value < totalPages
})

onMounted(() => {
  watchEffect(() => {
    mockUserService(3, page.value, levelFilter.value, provinceFilter.value)
      .then((response) => {
        users.value = response.data
        totalUsers.value = response.headers['x-total-count']
      })
      .catch((error) => {
        console.error('There was an error!', error)
      })
  })
})

const mockUserService = async (
  pageSize: number,
  pageNumber: number,
  levelValue: number | null,
  provinceValue: string | null
) => {
  let allData: UserRow[] = allUsers.value.map(user => ({
    id: user.id,
    name: `${user.name} ${user.surname}`,
    email: `${user.username}@gmail.com`,
    level: user.level,
    status: user.active ? 'Active' as const : 'Inactive' as const,
    province: user.province,
  }))

  if (levelValue) {
    allData = allData.filter(user => user.level === levelValue)
  }
  if (provinceValue) {
    allData = allData.filter(user => user.province === provinceValue)
  }

  const start = (pageNumber - 1) * pageSize
  return {
    data: allData.slice(start, start + pageSize),
    headers: { 'x-total-count': allData.length }
  }
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-6 px-4 pb-12 font-sans text-black">
    <div class="relative w-full max-w-6xl flex flex-col items-center">
      
      <CardBase class="!bg-[#f2f2f2] p-8 md:p-12 w-full flex flex-col gap-6 rounded-[40px] shadow-sm">
        
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center w-full mb-4">
            <button @click="goBack"
                class="absolute -top-3 -left-10 bg-[#5BF09F] text-[#003366] font-bold text-[22px] px-12 py-3 rounded-[30px] z-10 hover:brightness-95 transition shadow-sm tracking-wide">
                    Back
            </button>

          <h1 class="text-6xl font-black tracking-wide text-black mb-6 md:mb-0">
            User
          </h1>
          
          <div class="flex gap-4 md:gap-8 pr-4">
            <div class="flex flex-col items-center">
              <span class="text-xl font-bold mb-2">Filter by</span>
              <select
                :value="levelFilter ?? ''"
                @change="setLevelFilter"
                class="bg-[#dcdcdc] rounded-[20px] px-12 py-3 cursor-pointer hover:bg-[#d0d0d0] transition font-bold text-gray-500 text-xl outline-none"
              >
                <option value="">Level</option>
                <option v-for="level in levelOptions" :key="level" :value="level">Level {{ level }}</option>
              </select>
            </div>

            <div class="flex flex-col items-center">
              <span class="text-xl font-bold mb-2">Filter by</span>
              <select
                :value="provinceFilter ?? ''"
                @change="setProvinceFilter"
                class="bg-[#dcdcdc] rounded-[20px] px-12 py-3 cursor-pointer hover:bg-[#d0d0d0] transition font-bold text-gray-500 text-xl outline-none"
              >
                <option value="">Province</option>
                <option v-for="province in provinceOptions" :key="province" :value="province">{{ province }}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="w-full overflow-x-auto">
          <div class="min-w-[900px]">
            <div class="grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr] gap-4 px-8 mb-2">
              <div class="font-bold text-[17px] pl-4">Name</div>
              <div class="font-bold text-[17px]">Email</div>
              <div class="font-bold text-[17px]">Level</div>
              <div class="font-bold text-[17px]">Status</div>
              <div class="font-bold text-[17px]">Province</div>
            </div>

            <div class="flex flex-col gap-4">
              <div
                v-for="user in users"
                :key="user.id"
                @click="goToUserProfile(user.id)"
                class="bg-[#dcdcdc] rounded-[30px] p-4 px-8 grid grid-cols-[1.5fr_2fr_1fr_1fr_1fr] gap-4 items-center cursor-pointer hover:bg-[#d0d0d0] transition"
              >
                
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-full border-[2.5px] border-black flex items-center justify-center shrink-0">
                    <svg class="w-7 h-7 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </div>
                  <span class="font-bold text-sm tracking-wide whitespace-nowrap">{{ user.name }}</span>
                </div>
                
                <div class="font-bold text-sm underline underline-offset-4 decoration-2 break-all">
                  {{ user.email }}
                </div>
                
                <div>
                  <div class="bg-[#FCE1B6] text-black font-bold px-6 py-2 rounded-full text-center text-sm inline-block min-w-[90px]">
                    Level {{ user.level }}
                  </div>
                </div>
                
                <div>
                  <div 
                    :class="[
                      'font-bold px-6 py-2 rounded-full text-center text-sm inline-block min-w-[90px]',
                      user.status === 'Active' ? 'bg-[#5BF09F] text-black' : 'bg-[#f97316] text-black'
                    ]"
                  >
                    {{ user.status }}
                  </div>
                </div>
                
                <div class="font-bold text-sm">
                  {{ user.province }}
                </div>

              </div>
            </div>
          </div>
        </div>
      </CardBase>

      <div class="w-full flex justify-between mt-6 px-2">
        <RouterLink
          :to="{ name: 'admin-management', params: { id: route.params.id }, query: { ...route.query, page: page - 1 } }"
          rel="prev"
          v-if="page != 1"
          class="bg-[#5BF09F] text-[#003366] font-bold text-[22px] px-14 py-3 rounded-full hover:brightness-95 transition tracking-wide text-center"
        >
          Prev
        </RouterLink>
        <div v-else></div>

        <RouterLink
          :to="{ name: 'admin-management', params: { id: route.params.id }, query: { ...route.query, page: page + 1 } }"
          rel="next"
          v-if="hasNextPage"
          class="bg-[#5BF09F] text-[#003366] font-bold text-[22px] px-14 py-3 rounded-full hover:brightness-95 transition tracking-wide text-center"
        >
          Next
        </RouterLink>
      </div>

    </div>
  </div>
</template>