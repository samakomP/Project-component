<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import LevelService from '@/services/LevelService'
import UserServices from '@/services/UserServices'
import { useMessageStore } from '@/stores/message'
import type { Benefit, Service } from '@/types'

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
const { messageEdit } = storeToRefs(messageStore)

const level = computed(() => Number(route.params.level))

const benefits = ref<Benefit[]>([])
const services = ref<Service[]>([])
const passRate = ref('')

const levelDetail = computed(() => ({
  level: level.value,
  passRate: passRate.value,
  benefits: benefits.value,
  services: services.value,
}))

onMounted(() => {
  LevelService.getLevelByNumber(level.value).then((response) => {
    const raw = response.data[0] as LevelRaw
    passRate.value = `${raw.passCriteria}% Pass`
  })

  UserServices.getBenefitsByLevel(level.value)
    .then((response) => {
      benefits.value = response.data.map((benefit: BenefitRaw) => ({
        id: benefit.benefits_ID,
        level: benefit.level_ID,
        name: benefit.benefitName,
        description: benefit.description,
      }))
    })
    .catch((error) => {
      console.error('Error fetching benefits', error)
    })

  UserServices.getServicesByLevel(level.value)
    .then((response) => {
      services.value = response.data.map((service: ServiceRaw) => ({
        id: service.service_ID,
        level: service.level_ID,
        name: service.serviceName,
        description: service.description,
      }))
    })
    .catch((error) => {
      console.error('Error fetching services', error)
    })
})

const goBack = () => {
  router.push({ name: 'admin-level', params: { id: route.params.id } })
}

</script>

<template>
  <div class="w-full flex flex-col items-center mt-12 px-4 pb-12 font-sans text-black">
    <div class="relative w-full max-w-5xl mt-6">
      
      <button 
        @click="goBack" 
        class="absolute -top-7 left-8 bg-[#5BF09F] text-[#003366] font-bold text-2xl px-12 py-3 rounded-[30px] z-10 hover:brightness-95 transition shadow-sm"
      >
        Back
      </button>

      <CardBase class="!bg-[#f2f2f2] p-10 md:p-14 w-full flex flex-col gap-10 rounded-[40px] pt-16 relative">
        <div v-if="messageEdit" id="flashMessage"
          class="absolute -top-18 left-1/2 -translate-x-1/2 w-fit z-50 shadow-md rounded-3xl px-6 py-3 bg-orange-500">
          <h4 class="font-bold text-gray-800">{{ messageEdit }}</h4>
        </div>

        <div class="flex justify-end gap-6 w-full pr-4">
          <div class="bg-[#FCE1B6] text-black font-bold px-6 py-3 rounded-full text-center text-lg tracking-wide min-w-[130px]">
            Level {{ levelDetail.level }}
          </div>
          <div class="bg-[#D9C8E8] text-black font-bold px-6 py-3 rounded-full text-center text-lg tracking-wide min-w-[130px]">
            {{ levelDetail.passRate }}
          </div>
        </div>

        <div class="flex flex-col md:flex-row w-full gap-16 md:gap-12 px-4 md:px-12 mt-4">
          
          <div class="flex-1 flex flex-col gap-8">
            <h2 class="text-5xl font-serif tracking-wide text-black">Benefits</h2>
            <ul class="list-disc pl-6 flex flex-col gap-2">
              <li
                v-for="benefit in levelDetail.benefits"
                :key="benefit.id"
                class="text-xl font-bold font-sans leading-snug"
              >
                {{ benefit.name }}
              </li>
            </ul>
          </div>

          <div class="flex-1 flex flex-col gap-8">
            <h2 class="text-5xl font-serif tracking-wide text-black">Services</h2>
            <ul class="list-disc pl-6 flex flex-col gap-6">
              <li
                v-for="service in levelDetail.services"
                :key="service.id"
              >
                <div class="text-xl font-bold font-sans">{{ service.name }}</div>
                <div class="text-lg font-bold font-sans text-[#a3a3a3] mt-0.5">
                  {{ service.description }}
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div class="flex justify-center mt-12 mb-4">
          <RouterLink
            :to="{ name: 'admin-edit-level', params: { id: route.params.id, level: level } }"
            class="bg-[#5BF09F] text-[#003366] font-bold text-xl px-16 py-3 rounded-full hover:brightness-95 transition"
          >
            Edit
          </RouterLink>
        </div>

      </CardBase>
    </div>
  </div>
</template>