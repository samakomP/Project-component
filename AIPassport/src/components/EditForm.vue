<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  initialData: {
    name: string
    surname: string
    email: string
    province: string
  }
}>()

const emit = defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()

const formData = ref({ ...props.initialData })

const onSubmit = () => {
  emit('save')
}

const onCancel = () => {
  emit('cancel')
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="flex flex-col gap-7">
    
    <div>
      <label class="block text-2xl font-bold text-black mb-2">First name</label>
      <input
        v-model="formData.name"
        type="text"
        class="w-full h-12 bg-[#d9d9d9] text-gray-900 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#5BF09F]"
      />
    </div>

    <div>
      <label class="block text-2xl font-bold text-black mb-2">Last name</label>
      <input
        v-model="formData.surname"
        type="text" 
        class="w-full h-12 bg-[#d9d9d9] text-gray-900 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#5BF09F]" 
      />
    </div>
    
    <div>
      <label class="block text-2xl font-bold text-black mb-2">Email</label>
      <input 
        v-model="formData.email" 
        type="email" 
        class="w-full h-12 bg-[#d9d9d9] text-gray-900 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#5BF09F]" 
      />
    </div>
    
    <div>
      <label class="block text-2xl font-bold text-black mb-2">Province</label>
      <input 
        v-model="formData.province" 
        type="text" 
        class="w-full h-12 bg-[#d9d9d9] text-gray-900 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#5BF09F]" 
      />
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center mt-8 gap-6">
      <button 
        type="submit" 
        class="bg-[#5BF09F] text-[#003366] font-bold text-2xl px-14 py-3 rounded-full hover:brightness-95 transition tracking-wide cursor-pointer"
      >
        Save
      </button>
      <button 
        type="button" 
        @click="onCancel"
        class="bg-[#E63700] text-white font-bold text-2xl px-10 py-3 rounded-full hover:brightness-95 transition tracking-wide cursor-pointer "
      >
        Cancel
      </button>
    </div>
    
  </form>
</template>

<style scoped>
input {
  border: none;
}
</style>
