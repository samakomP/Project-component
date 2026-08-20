import { levels } from '@/mock/levels'
import { benefits } from '@/mock/benefits'
import { services } from '@/mock/services'

export function getLevels() {
  return levels
}

export function getLevelByNumber(levelNumber: number) {
  return levels.find(level => level.levelNumber === levelNumber)
}

export function getBenefitsByLevel(levelNumber: number) {
  return benefits.filter(benefit => benefit.level === levelNumber)
}

export function getServicesByLevel(levelNumber: number) {
  return services.filter(service => service.level === levelNumber)
}

export function getPassCriteria(levelNumber: number) {
  return getLevelByNumber(levelNumber)?.passCriteria ?? 0
}