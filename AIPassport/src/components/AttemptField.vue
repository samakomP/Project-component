<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <span class="text-base font-bold">{{ label }}</span>
    <span class="text-2xl font-bold">{{ value }}</span>
  </div>
</template>
