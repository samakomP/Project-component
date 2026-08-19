<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import UserEditForm from '@/components/EditForm.vue'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()


const initialFormData = ref({
  fName: '',
  lName: '',
  email: '',
  province: ''
})

const isDataReady = ref(false)

onMounted(() => {
  if (user.value) {
    initialFormData.value = {
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
      
      <UserEditForm 
        v-if="isDataReady"
        :initial-data="initialFormData"
        @save="handleSave"
        @cancel="handleCancel"
      />
      
    </CardBase>
  </div>
</template>

<style scoped>
input {
  border: none;
}
</style>