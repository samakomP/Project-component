<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

withDefaults(
  defineProps<{
    resource?: string
  }>(),
  {
    resource: 'page'
  }
)

const router = useRouter()
const authStore = useAuthStore()

// Go back to wherever the user came from. The bad URL never entered history (the
// guard redirected before committing it), so back() lands on the last good page.
// With no history to go back to (pasted URL / fresh tab) fall back to their own
// home rather than the login screen.
const goBack = () => {
  if (window.history.state?.back) {
    router.back()
    return
  }

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
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <span class="font-sans text-sm font-bold tracking-[0.3em] text-gray-500 uppercase">Error 404</span>

        <h1 class="text-4xl sm:text-5xl md:text-6xl font-black tracking-wide leading-none">Oops!</h1>

        <h3 class="text-lg sm:text-xl md:text-2xl font-sans font-bold text-gray-600 leading-relaxed max-w-md">
          The <span class="text-[#591c0b]">{{ resource }}</span> you're looking for is not here.
        </h3>

        <button
          type="button"
          @click="goBack"
          class="mt-2 w-full sm:w-auto bg-[#5BF09F] text-[#003366] font-bold font-sans text-lg md:text-xl px-10 md:px-14 py-4 rounded-full hover:brightness-95 transition tracking-wide shadow-sm cursor-pointer"
        >
          Go Back
        </button>

      </div>
    </CardBase>
  </div>
</template>
