<script setup lang="ts">
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
import { useUserStore } from '@/stores/user'
import { getServicesByLevel } from '@/services/LevelService'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const services = computed(() => getServicesByLevel(user.value?.level ?? 0))

const userInput = ref('')

const handleSend = () => {
  if (!userInput.value) return
  console.log('Submitting:', userInput.value)
  userInput.value = ''
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-12 px-4 pb-12 font-serif text-black">
    <div class="w-full max-w-5xl flex flex-col gap-6">
      
      <div class="flex justify-between items-end w-full px-6">
        <h1 class="text-[64px] font-bold tracking-wide leading-none">A?</h1>
        
        <PillLevel class="!bg-[#a7f3d0] !text-black text-4xl px-12 py-3 font-bold shadow-sm">
          Level {{ user?.level }}
        </PillLevel>
      </div>

      <CardBase class="!bg-[#e6e6e6] p-6 md:p-8 w-full min-h-[500px] rounded-[40px] shadow-sm relative">

        <div class="flex flex-col h-full">
          <div class="flex flex-col gap-4 overflow-y-auto text-start text-2xl text-center">
            <div
              v-for="service in services"
              :key="service.id"
              class="bg-[#dcdcdc] rounded-[20px] py-48 px-8 mb-8 text-start text-2xl"
            >
              <div class="font-bold text-lg">{{ service.name }}</div>
              <div class="text-gray-600">{{ service.description }}</div>
            </div>

            <p v-if="services.length === 0" class="text-center text-gray-500 font-bold">
              No services available for your level yet.
            </p>
          </div>

          <div class="flex items-center gap-4 w-full mt-auto">
            <input
              v-model="userInput"
              type="text"
              class="w-full h-[52px] bg-[#FCC084] rounded-full px-8 outline-none text-black font-sans font-bold text-lg focus:ring-2 focus:ring-[#f9a34b] transition-all shadow-sm"
            />

            <button
              @click="handleSend"
              class="w-[100px] h-[52px] bg-[#5BF09F] rounded-full flex items-center justify-center shrink-0 hover:brightness-95 transition-all cursor-pointer shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#233237] stroke-2">
                <path fill-rule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.22-6.22V21a.75.75 0 01-1.5 0V4.81l-6.22 6.22a.75.75 0 11-1.06-1.06l7.5-7.5z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

      </CardBase>
      
    </div>
  </div>
</template>