<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

const router = useRouter()
const authStore = useAuthStore()


const goHome = () => {
  const user = authStore.user
  if (!user) {
    router.push({ name: 'login-view' })
    return
  }

  router.push({
    name: user.role === 'admin' ? 'admin-home-view' : 'userhome-view',
    params: { id: user.id },
  })
}
</script>

<template>
  <div class="w-full flex items-center justify-center min-h-[70vh] px-4 py-12 font-serif text-black">
    <CardBase class="bg-[#f2f2f2]! rounded-[40px] w-full max-w-2xl p-8 sm:p-12 md:p-16">
      <div class="flex flex-col items-center text-center gap-6">

        <div class="flex items-center justify-center w-28 h-28 md:w-32 md:h-32 bg-[#FCE1B6] rounded-full shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="#591c0b" class="w-14 h-14 md:w-16 md:h-16">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.288 15.288a3 3 0 014.424 0M5.106 11.106a7.5 7.5 0 0110.606 0M2.628 7.4A10.5 10.5 0 0115 4.62M3 3l18 18" />
          </svg>
        </div>

        <span class="font-sans text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">Network Error</span>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-wide leading-none">Uh-Oh!</h1>

        <h3 class="text-lg sm:text-xl md:text-2xl font-sans font-bold text-gray-600 leading-relaxed max-w-md">
          It looks like you're experiencing some network issues. Please take a breath and try again.
        </h3>

        <div class="mt-2 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            type="button"
            @click="router.go(-1)"
            class="w-full sm:w-auto bg-[#5BF09F] text-[#003366] font-bold font-sans text-lg md:text-xl px-10 md:px-14 py-4 rounded-full hover:brightness-95 transition tracking-wide shadow-sm"
          >
            Try Again
          </button>

          <button
            type="button"
            @click="goHome"
            class="w-full sm:w-auto bg-[#dcdcdc] text-[#003366] font-bold font-sans text-lg md:text-xl px-10 md:px-14 py-4 rounded-full hover:brightness-95 transition tracking-wide shadow-sm cursor-pointer"
          >
            Back to Home
          </button>
        </div>

      </div>
    </CardBase>
  </div>
</template>
