<script setup lang="ts">
defineProps<{
  label: string
  active: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <button
    @click="$emit('click')"
    :class="active ? 'bg-[#fbc58b] text-black' : 'bg-[#b3b3b3] text-black hover:bg-[#a0a0a0]'"
    class="w-full py-2 rounded-xl font-bold text-xl transition-colors duration-200"
  >
    {{ label }}
  </button>
</template>
