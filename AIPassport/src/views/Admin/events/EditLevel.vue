<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import CardBase from '@/components/CardBase.vue'
import LevelService from '@/services/LevelService'
import UserServices from '@/services/UserServices'
import { useMessageStore } from '@/stores/message'

interface BenefitRaw {
  benefits_ID: number
  level_ID: number
  benefitName: string
  description: string
}

interface LevelRaw {
  level_ID: number
  levelNumber: number
  passCriteria: number
}

interface ServiceRaw {
  service_ID: number
  level_ID: number
  serviceName: string
  description: string
}

const route = useRoute()
const router = useRouter()
const messageStore = useMessageStore()

const level = computed(() => Number(route.params.level))

const passRate = ref(0)

const benefitsText = ref('')
const servicesText = ref('')

onMounted(() => {
  LevelService.getLevelByNumber(level.value).then((response) => {
    const raw = response.data[0] as LevelRaw
    passRate.value = raw.passCriteria
  })

  UserServices.getBenefitsByLevel(level.value)
    .then((response) => {
      benefitsText.value = response.data
        .map((benefit: BenefitRaw) => `• ${benefit.benefitName}`)
        .join('\n')
    })
    .catch((error) => {
      console.error('Error fetching benefits', error)
    })

  UserServices.getServicesByLevel(level.value)
    .then((response) => {
      servicesText.value = response.data
        .map((service: ServiceRaw) => `• ${service.serviceName}\n${service.description}`)
        .join('\n\n')
    })
    .catch((error) => {
      console.error('Error fetching services', error)
    })
})

const handleSave = () => {
  messageStore.updateMessageEdit('Level details updated!')
  setTimeout(() => {
    messageStore.resetMessageEdit()
  }, 3000)

  router.push({
    name: 'admin-level-detail',
    params: { id: route.params.id, level: level.value },
  })
}

const handleCancel = () => {
  router.back()
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-12 px-4 pb-12 font-sans text-black">
    <div class="w-full max-w-5xl">
      <CardBase class="!bg-[#f2f2f2] p-10 md:p-14 w-full flex flex-col gap-10 rounded-[40px]">
        
        <div class="flex justify-end gap-6 w-full pr-4 mt-2">
          <div class="bg-[#FCE1B6] text-black font-bold px-8 py-3 rounded-full text-center text-lg tracking-wide min-w-[130px]">
            Level {{ level }}
          </div>
          <div class="bg-[#D9C8E8] text-black font-bold px-6 py-3 rounded-full flex items-center justify-center text-lg tracking-wide min-w-[130px] focus-within:ring-2 focus-within:ring-purple-400 transition-all">
            <input 
              v-model="passRate" 
              type="number" 
              min="0"
              max="100"
              class="w-12 bg-transparent outline-none font-bold text-right mr-1 placeholder-black" 
            />
            <span>%</span>
          </div>
        </div>

        <div class="flex flex-col md:flex-row w-full gap-12 px-4 md:px-12 mt-2">
          
          <div class="flex-1 flex flex-col">
            <h2 class="text-5xl font-serif tracking-wide text-black mb-8">Benefits</h2>
            <textarea
              v-model="benefitsText"
              class="bg-[#dcdcdc] rounded-[30px] p-8 w-full min-h-[340px] text-[17px] font-bold font-sans outline-none resize-none leading-relaxed focus:ring-2 focus:ring-[#5BF09F] transition-all"
            ></textarea>
          </div>

          <div class="flex-1 flex flex-col">
            <h2 class="text-5xl font-serif tracking-wide text-black mb-8">Services</h2>
            <textarea
              v-model="servicesText"
              class="bg-[#dcdcdc] rounded-[30px] p-8 w-full min-h-[340px] text-[17px] font-bold font-sans outline-none resize-none leading-relaxed focus:ring-2 focus:ring-[#5BF09F] transition-all"
            ></textarea>
          </div>

        </div>

        <div class="flex flex-row justify-center gap-16 md:gap-24 mt-6 mb-6">
          <button 
            @click="handleSave"
            class="bg-[#5BF09F] text-[#003366] font-bold text-xl px-16 py-3 rounded-full hover:brightness-95 transition"
          >
            Save
          </button>
          <button 
            @click="handleCancel"
            class="bg-[#e63900] text-white font-bold text-xl px-14 py-3 rounded-full hover:brightness-95 transition"
          >
            Cancel
          </button>
        </div>

      </CardBase>
    </div>
  </div>
</template>