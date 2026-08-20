<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import UserEditForm from '@/components/EditForm.vue'
import { useMessageStore } from '@/stores/message'


const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const router = useRouter()
const store = useMessageStore()

const initialFormData = ref({
  name: '',
  surname: '',
  email: '',
  province: ''
})

const isDataReady = ref(false)

onMounted(() => {
  if (user.value) {
    initialFormData.value = {
      name: user.value.name || '',
      surname: user.value.surname || '',
      email: user.value.username ? `${user.value.username}@gmail.com` : '',
      province: user.value.province || ''
    }
  }
  isDataReady.value = true
})

const handleSave = () => {
  store.updateMessageEdit(`The User Deatils was update!`)
  setTimeout(() => {
      store.resetMessageEdit()
    }, 3000)

  router.push({
    name: 'admin-user-detail',
    params: { id: user.value?.id },
    query: { updated: 'true' },
  })
}

const handleCancel = () => {
  router.push({ name: 'admin-user-detail', params: { id: user.value?.id } })
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
