<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UserProfileLayout from '@/components/UserProfileCard.vue'
import { getUserById, activateUser, deactivateUser } from '@/services/UserService'

import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message'

const store = useMessageStore()

const { messageEdit } = storeToRefs(store)

const route = useRoute()
const router = useRouter()

const userId = computed(() => Number(route.params.userId))
const targetUser = ref(getUserById(userId.value))

const adminViewUser = computed(() => ({
  id: targetUser.value?.id ?? 0,
  name: targetUser.value?.name ?? '',
  surname: targetUser.value?.surname ?? '',
  level: targetUser.value?.level ?? 0,
  joinDate: '05-1-2025',
  active: targetUser.value?.active ?? true,
}))

const adminLinks = [
  { label: 'Detail', name: 'admin-user-detail' },
  { label: 'History Exam', name: 'admin-user-history' },
]
  const goBack = () => {router.push({ name: 'admin-management', params: { id: route.params.id } })}

const toggleActive = () => {
  if (!targetUser.value) return

  if (targetUser.value.active) {
    deactivateUser(targetUser.value.id)
  } else {
    activateUser(targetUser.value.id)
  }
  targetUser.value = getUserById(userId.value)
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-12 px-4 pb-12 font-serif text-black">
    
    <UserProfileLayout :user="adminViewUser" :links="adminLinks">
      

      <template #top-left>
        <button 
          @click="goBack" 
          class="absolute -top-7 left-8 bg-[#5BF09F] text-[#003366] font-bold text-2xl px-10 py-3 rounded-full z-10 hover:brightness-95 transition shadow-sm tracking-wide"
        >
          Back
        </button>
      </template>


      <template #header-badge-left>
        <div class="bg-[#FCE1B6] text-[#003366] font-bold text-2xl px-8 py-1.5 rounded-full w-fit tracking-wide mb-1">
          Level {{ adminViewUser.level }}
        </div>
      </template>

  
      <template #header-right>
        <div class="flex flex-col gap-4 w-full md:w-[220px]">
          <div
            :class="adminViewUser.active ? 'bg-[#5BF09F] text-[#003366]' : 'bg-[#dcdcdc] text-black'"
            class="font-bold text-2xl px-12 py-3 rounded-full text-center tracking-wide w-full"
          >
            {{ adminViewUser.active ? 'Active' : 'Inactive' }}
          </div>
          <button
            @click="toggleActive"
            :class="adminViewUser.active ? 'bg-[#e63900] text-white' : 'bg-[#5BF09F] text-[#003366]'"
            class="font-bold text-2xl px-12 py-3 rounded-full hover:brightness-95 transition tracking-wide w-full"
          >
            {{ adminViewUser.active ? 'Deactivate' : 'Activate' }}
          </button>
        </div>
      </template>

    </UserProfileLayout>

    <div id="flashMessage" v-if="messageEdit"
      class="absolute top-3 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-6 py-3 bg-pink-200">
      <h4 class="font-bold text-gray-800">{{ messageEdit }}</h4>
    </div>
    
  </div>
</template>