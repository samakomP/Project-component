<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'

defineProps<{
  value: string | number
}>()
</script>

<template>
  <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col items-center justify-center aspect-square text-center">
    <span class="text-xl font-bold mb-3"><slot /></span>
    <span class="text-4xl font-bold">{{ value }}</span>
  </CardBase>
</template>
