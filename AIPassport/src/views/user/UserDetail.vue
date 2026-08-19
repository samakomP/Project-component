<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()

const showFlash = ref(false)

onMounted(() => {
  if (route.query.updated === 'true') {
    showFlash.value = true
    router.replace({ query: {} })
    setTimeout(() => {
      showFlash.value = false
    }, 3000)
  }
})
</script>

<template>
  <div v-if="user" class="space-y-8">
    <div
      v-if="showFlash"
      class="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-xl text-center font-bold text-xl transition-all shadow-sm"
    >
      Profile updated successfully!
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-lg font-serif">
      <p><span class="text-gray-700">First name :</span> <span class="font-bold text-gray-900">{{ user.fName }}</span></p>
      <p><span class="text-gray-700">Last name :</span> <span class="font-bold text-gray-900">{{ user.lName }}</span></p>
      <p><span class="text-gray-700">Email :</span> <span class="font-bold text-gray-900">{{ user.username }}@gmail.com</span></p>
      <p><span class="text-gray-700">Province :</span> <span class="font-bold text-gray-900">{{ user.province }}</span></p>
    </div>

    <div class="flex justify-center">
      <router-link 
        :to="{ name: 'user-detailEdit-view', params: { id: user.users_ID } }" 
        class="bg-[#FCC084] text-[#003366] font-bold text-2xl px-16 py-3 rounded-[40px] hover:opacity-80 transition inline-block"
      >
        Edit
      </router-link>
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