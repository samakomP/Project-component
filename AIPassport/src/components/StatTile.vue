<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'

defineProps<{
  value: string | number
}>()
</script>

<template>
  <CardBase class="!bg-[#dcdcdc] !rounded-[40px] !shadow-none p-6 flex flex-col static items-center justify-center aspect-square text-center">
    <span class="inline-block items-center justify-center text-3xl font-bold mb-3"><slot/></span><br/>
    <span class="items-center justify-center text-4xl font-bold">{{ value }}</span>
  </CardBase>
</template>
