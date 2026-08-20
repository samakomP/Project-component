import { levels } from '@/mock/levels'
import { Benefits } from '@/mock/Benefits'
import { Services } from '@/mock/Services'
import type { Level, Benefit, Service } from '@/types'

function toLevel(raw: (typeof levels)[number]): Level {
  return {
    id: raw.level_ID,
    levelNumber: raw.levelNumber,
    name: `Level ${raw.levelNumber}`,
    passCriteria: raw.passCriteria,
  }
}

export function getLevels(): Level[] {
  return levels.map(toLevel)
}

export function getLevelByNumber(levelNumber: number): Level | undefined {
  return getLevels().find(level => level.levelNumber === levelNumber)
}

export function getBenefitsByLevel(levelNumber: number): Benefit[] {
  return Benefits
    .filter(benefit => benefit.level_ID === levelNumber)
    .map(benefit => ({
      id: benefit.benefits_ID,
      level: benefit.level_ID,
      name: benefit.benefitName,
      description: benefit.description,
    }))
}

export function getServicesByLevel(levelNumber: number): Service[] {
  return Services
    .filter(service => service.level_ID === levelNumber)
    .map(service => ({
      id: service.service_ID,
      level: service.level_ID,
      name: service.serviceName,
      description: service.description,
    }))
}

export function getPassCriteria(levelNumber: number): number {
  return getLevelByNumber(levelNumber)?.passCriteria ?? 0
}
