<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
</script>

<template>
  <div v-if="user" class="space-y-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg font-serif">
      <p><span class="text-gray-700">First name :</span> <span class="font-bold text-gray-900">{{ user.fName }}</span></p>
      <p><span class="text-gray-700">Last name :</span> <span class="font-bold text-gray-900">{{ user.lName }}</span></p>
      <p><span class="text-gray-700">Email :</span> <span class="font-bold text-gray-900">{{ user.username }}@gmail.com</span></p>
      <p><span class="text-gray-700">Province :</span> <span class="font-bold text-gray-900">{{ user.province }}</span></p>
    </div>

  </div>
</template>

<style scoped>
.profile {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.profile p {
  margin: 8px 0;
  width: 100%;
}
</style>