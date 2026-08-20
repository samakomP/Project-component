<script setup lang="ts">
defineProps<{
  letter: string
  text: string
  selected: boolean
}>()

defineEmits<{
  (e: 'select'): void
}>()
</script>

<template>
  <div
    @click="$emit('select')"
    :class="selected ? 'bg-[#8faadc] text-black' : 'bg-[#dcdcdc] text-black hover:bg-[#d0d0d0]'"
    class="w-full px-5 py-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors duration-200 font-sans text-sm font-bold"
  >
    <span>{{ letter }}.</span>
    <span>{{ text }}</span>
  </div>
</template>
