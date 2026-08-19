import { levels } from '@/mock/levels'
import { benefits } from '@/mock/benefits'
import { services } from '@/mock/services'

export function getLevels() {
  return levels
}

export function getLevelByNumber(levelNumber: number) {

  for (let i = 0; i < levels.length; i++) {
    if (levels[i].levelNumber === levelNumber) {
        return levels[i];
    }
  }
  return undefined;
}

export function getBenefitsByLevel(levelNumber: number) {
    const result = [];
    
    for (let i = 0; i < benefits.length; i++) {
        if (benefits[i].level === levelNumber) {
            result.push(benefits[i]);
    }
  }
  return result;
}

export function getServicesByLevel(levelNumber: number) {
  return services.filter(service => service.level === levelNumber)
}

export function getPassCriteria(levelNumber: number) {
  return getLevelByNumber(levelNumber)?.passCriteria ?? 0
}