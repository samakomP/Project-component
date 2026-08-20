<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { useMessageStore } from '@/stores/message'


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const route = useRoute()
const router = useRouter()

const store = useMessageStore()

const { messageEdit } = storeToRefs(store)

const showFlash = ref(false)
let flashTimeout: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  if (route.query.updated === 'true') {
    showFlash.value = true
    router.replace({ query: {} })
    flashTimeout = setTimeout(() => {
      showFlash.value = false
      store.resetMessage()
    }, 3000)
  }
})

onUnmounted(() => {
  if (flashTimeout) clearTimeout(flashTimeout)
})

const goToEdit = () => {
  router.push({ name: 'user-detailEdit-view', params: { id: user.value?.id } })
}
</script>

<template>
  <div v-if="user" class="space-y-8 relative">
      <div id="flashMessage" v-if= "messageEdit"
        class="absolute top-0 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-6 py-3 bg-pink-200">
        <h4 class="font-bold text-gray-800">{{ messageEdit }}</h4>
      </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-y-13 gap-x-8 text-lg pt-20 font-serif">
      <p><span class="text-gray-700">First name :</span> <span class="font-bold text-gray-900">{{ user.name }}</span></p>
      <p><span class="text-gray-700">Last name :</span> <span class="font-bold text-gray-900">{{ user.surname }}</span></p>
      <p><span class="text-gray-700">Email :</span> <span class="font-bold text-gray-900">{{ user.username }}@gmail.com</span></p>
      <p><span class="text-gray-700">Province :</span> <span class="font-bold text-gray-900">{{ user.province }}</span></p>
    </div>

    <div class="flex justify-center">
      <button
        @click="goToEdit"
        class="bg-[#FCC084] text-[#003366] font-bold text-2xl px-16 py-3 rounded-[40px] hover:opacity-80 transition inline-block"
      >
        Edit
      </button>
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