import { elearningContents } from '@/mock/elearning'

export function getELearningByLevel(level: number) {
  return elearningContents.filter(content => content.level === level)
}