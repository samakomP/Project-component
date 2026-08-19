<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()


const formData = ref({
  fName: '',
  lName: '',
  email: '',
  province: ''
})


onMounted(() => {
  if (user.value) {
    formData.value = {
      fName: user.value.fName || '',
      lName: user.value.lName || '',
      email: user.value.username ? `${user.value.username}@gmail.com` : '',
      province: user.value.province || ''
    }
  }
})

const handleSave = () => {

  router.push({
    name: 'userdetail-view',
    params: { id: user.value?.users_ID },
    query: { updated: 'true' }
  })
}

const handleCancel = () => {
  router.push({ name: 'userdetail-view', params: { id: user.value?.users_ID } })
}
</script>

<template>
  <div class="w-full max-w-2xl mx-auto px-4 md:px-0 mt-4 pb-8">
    
  
    <CardBase class="p-8 md:p-12 relative">
      
      <form @submit.prevent="handleSave" class="flex flex-col gap-7">
        <div>
          <label class="block text-2xl font-bold text-black mb-2">First name</label>
          <input 
            v-model="formData.fName" 
            type="text" 
            class="w-full h-12 bg-[#d9d9d9] text-gray-900 px-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#5BF09F]" 
          />
        </div>
        <div>
          <label class="block text-2xl font-bold text-black mb-2">Last name</label>
          <input 
            v-model="formData.lName" 
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
            @click="handleCancel"
            class="bg-[#E63700] text-white font-bold text-2xl px-10 py-3 rounded-full hover:brightness-95 transition tracking-wide cursor-pointer "
          >
            Cancel
          </button>
        </div>
        
      </form>
      
    </CardBase>
    
  </div>
</template>

<style scoped>
input {
  border: none;
}
</style>