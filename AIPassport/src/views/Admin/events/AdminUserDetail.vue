<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Detail from '@/components/Detail.vue'
import router from '@/router'

const route = useRoute()
const userId = computed(() => Number(route.params.userId))

const goToEdit = () => {
  router.push({ name: 'admin-detailEdit-view', params: { id: route.params.id, userId: userId.value } })
}
</script>



<template>
  <div class="pt-4">
    <Detail :user-id="userId" />
  </div>
   <div class="flex justify-center pt-18">
      <button
        @click="goToEdit"
        class="bg-[#FCC084] text-[#003366] font-bold text-2xl px-16 py-3 rounded-[40px] hover:opacity-80 transition inline-block"
      >
        Edit
      </button>
    </div>
</template>
