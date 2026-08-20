<script setup lang="ts">
import { computed } from 'vue'
import { getUserById } from '@/services/UserService'

const props = defineProps<{
  userId: number
}>()

const user = computed(() => getUserById(props.userId))
</script>

<template>
  <div v-if="user" class="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-8 text-lg">
    <p><span class="text-gray-700">First name :</span> <span class="font-bold text-gray-900">{{ user.name }}</span></p>
    <p><span class="text-gray-700">Last name :</span> <span class="font-bold text-gray-900">{{ user.surname }}</span></p>
    <p><span class="text-gray-700">Email :</span> <span class="font-bold text-gray-900">{{ user.username }}@gmail.com</span></p>
    <p><span class="text-gray-700">Province :</span> <span class="font-bold text-gray-900">{{ user.province }}</span></p>
  </div>
</template>
