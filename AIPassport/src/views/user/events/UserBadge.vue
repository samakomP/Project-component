<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import CardBase from '@/components/CardBase.vue'
import LevelService from '@/services/LevelService'
import { useUserStore } from '@/stores/user'

interface LevelRaw {
  level_ID: number
  levelNumber: number
  passCriteria: number
}

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const levelNumbers = ref<number[]>([])

onMounted(() => {
  LevelService.getLevels().then((response) => {
    levelNumbers.value = (response.data as LevelRaw[])
      .map(raw => raw.levelNumber)
      .sort((a, b) => a - b)
  })
})
</script>

<template>
  <div class="w-full flex flex-col items-center mt-2 px-4 pb-8 font-serif">

    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
      Your All Achievement
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 w-full max-w-2xl">

      <CardBase
        v-for="levelNumber in levelNumbers"
        :key="levelNumber"
        :class="[
          'rounded-[30px]! shadow-none! aspect-square flex items-center justify-center p-4 transition',
          levelNumber <= user!.level ? 'bg-[#9ef0c6]!' : 'bg-[#dcdcdc]!'
        ]"
      >
        <span class="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-snug">
          <template v-if="levelNumber <= user!.level">Level {{ levelNumber }}<br>Pass!</template>
          <template v-else>Level {{ levelNumber }}</template>
        </span>
      </CardBase>

    </div>
  </div>
</template>
 