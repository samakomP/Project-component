<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import HistoryExam from '@/components/HistoryExam.vue'

const route = useRoute()
const userId = computed(() => Number(route.params.userId))
</script>

<template>
  <div class="w-full max-w-2xl mx-auto pt-4 font-serif">
    <HistoryExam :user-id="userId" />
  </div>
</template>
