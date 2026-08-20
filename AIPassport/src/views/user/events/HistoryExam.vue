<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import HistoryExam from '@/components/HistoryExam.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div class="w-full flex flex-col items-center mt-2 px-4 pb-8 font-serif">
    <div class="w-full max-w-2xl">
      <HistoryExam v-if="user" :user-id="user.id" />
    </div>
  </div>
</template>
