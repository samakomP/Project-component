import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import {
  getLevels,
  getBenefitsByLevel,
  getServicesByLevel,
} from '@/services/LevelService'

export const useLevelStore = defineStore('level', () => {
  const levels = ref(getLevels())

  const currentLevel = ref(1)

  const benefits = computed(() => {
    return getBenefitsByLevel(currentLevel.value)
  })

  const services = computed(() => {
    return getServicesByLevel(currentLevel.value)
  })

  function setLevel(level: number) {
    currentLevel.value = level
  }

  function upgradeLevel() {
    if (currentLevel.value < 4) {
      currentLevel.value++
    }
  }

  return {
    levels,
    currentLevel,
    benefits,
    services,
    setLevel,
    upgradeLevel,
  }
})