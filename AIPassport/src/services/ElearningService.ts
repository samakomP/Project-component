import { e_learning } from '@/mock/e_learning'
import type { ELearning } from '@/types'

export function getELearningByLevel(level: number): ELearning[] {
  return e_learning
    .filter(content => content.level_ID === level)
    .map(content => ({
      id: content.e_learning_ID,
      level: content.level_ID,
      title: content.e_learning_title,
      description: `Video content for ${content.e_learning_title}`,
      videoUrl: content.e_learning_videoUrl,
    }))
}
