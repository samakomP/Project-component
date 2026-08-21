<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import { useUserStore } from '@/stores/user'
import UserServices from '@/services/UserServices'
import type { Service, Benefit } from '@/types'

interface ServiceRaw {
  service_ID: number
  level_ID: number
  serviceName: string
  description: string
}

interface BenefitRaw {
  benefits_ID: number
  level_ID: number
  benefitName: string
  description: string
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const services = ref<Service[]>([])
const benefits = ref<Benefit[]>([])

onMounted(() => {
  UserServices.getServicesByLevel(user.value?.level ?? 0)
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

  UserServices.getBenefitsByLevel(user.value?.level ?? 0)
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
})
</script>

<template>
  <div class="w-full flex flex-col gap-10 mt-2 px-2 md:px-6 font-serif">

    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Services :</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">

        <CardBase
          v-for="service in services"
          :key="service.id"
          class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6"
        >
          <h3 class="font-bold text-xl text-black leading-tight">{{ service.name }}</h3>
          <p class="text-sm text-gray-600 font-sans mt-1">
            {{ service.description }}
          </p>
        </CardBase>

        <p v-if="services.length === 0" class="text-gray-500 font-bold">
          No services available for your level yet.
        </p>

      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6 mt-4">Benefits :</h2>
      

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

        <CardBase
          v-for="benefit in benefits"
          :key="benefit.id"
          class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 text-center flex flex-col justify-start"
        >
          <h3 class="font-bold text-lg text-black leading-snug mb-3">{{ benefit.name }}</h3>
          <p class="text-xs text-gray-600 font-sans">{{ benefit.description }}</p>
        </CardBase>

        <p v-if="benefits.length === 0" class="text-gray-500 font-bold col-span-full">
          No benefits available for your level yet.
        </p>

      </div>
    </div>

  </div>
</template>
