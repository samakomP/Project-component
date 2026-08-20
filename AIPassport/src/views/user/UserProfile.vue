<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import UserProfileLayout from '@/components/UserProfileCard.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

// The 4 sub-routes for the standard user
const profileLinks = [
  { label: 'Detail', name: 'userdetail-view' },
  { label: 'Services', name: 'user-service-view' },
  { label: 'Badges', name: 'user-badge-view' },
  { label: 'History Exam', name: 'user-history-view' }
]
</script>

<template>
  <div class="w-full flex flex-col items-center mt-6 px-4 pb-12 font-serif text-black">
    <UserProfileLayout v-if="user" :user="user" :links="profileLinks" />
  </div>
</template>