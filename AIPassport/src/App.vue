<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import { RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message'

import { storeToRefs } from 'pinia'
import Navbar from '@/components/NavBar.vue'


const store = useMessageStore()

const { message } = storeToRefs(store)

</script>

<template>
  <SpeedInsights />
  <Navbar />
  <div id="flashMessage" v-if="message"
    class="fixed top-3 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-6 py-3 bg-yellow-200">
    <h4 class="font-bold text-gray-800">{{ message }}</h4>
  </div>

  <main>
    <RouterView />
  </main>


</template>

<style scoped>
@keyframes yellowFade {
  from {
    background-color: #FCC084;
  }

  to {
    background-color: transparent;
  }
}

#flashMessage {
  animation: yellowFade 3s ease-in-out;
}
</style>
