<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import type { ELearning } from '@/types'

import BackHome from '@/components/BackHome.vue'
import ElearningService from '@/services/ElearningService'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentUserLevel = computed(() => user.value?.level || 1)

function getYoutubeThumbnail(url: string) {
  if (!url) return ''
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}

const videos = ref<ELearning[]>([])

interface ELearningRaw {
  e_learning_ID: number
  level_ID: number
  e_learning_title: string
  e_learning_videoUrl: string
}

onMounted(() => {
  ElearningService.getELearningByLevel(currentUserLevel.value)
    .then((response) => {
      videos.value = response.data.map((content: ELearningRaw) => ({
        id: content.e_learning_ID,
        level: content.level_ID,
        title: content.e_learning_title,
        description: `Video content for ${content.e_learning_title}`,
        videoUrl: content.e_learning_videoUrl,
      }))
    })
    .catch((error) => {
      console.error('Error fetching e-learning content', error)
    })
})

const completedIds = ref<Set<number>>(new Set())

function isComplete(id: number) {
  return completedIds.value.has(id)
}

function toggleComplete(id: number) {
  if (completedIds.value.has(id)) {
    completedIds.value.delete(id)
  } else {
    completedIds.value.add(id)
  }
}

const progressPercentage = computed(() => {
  if (videos.value.length === 0) return 0
  const completedCount = videos.value.filter(video => isComplete(video.id)).length
  return Math.round((completedCount / videos.value.length) * 100)
})
</script>

<template>
  <div class="w-full flex flex-col items-center mt-4 px-4 pb-12 font-serif">

    <div class="w-full max-w-3xl bg-[#f2f2f2] rounded-[40px] p-8 md:p-12 shadow-sm flex flex-col gap-12">
      <back-home/>
      
      <div class="flex flex-col md:flex-row items-center md:items-start gap-8">

        <div class="w-32 h-32 bg-[#e6e6e6] rounded-full flex items-center justify-center shrink-0">
          <svg class="w-16 h-16 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>

        <div class="flex flex-col grow w-full pt-2">
          <h1 class="text-3xl font-bold text-gray-900 mb-4 tracking-wide text-center md:text-left">E-Learning</h1>

          <div class="w-full">
            <div class="flex justify-between items-end mb-1 px-1">
              <span class="font-bold text-gray-900 text-lg">Complete</span>
              <span class="font-bold text-gray-900 text-sm">{{ progressPercentage }}%</span>
            </div>

            <div class="w-full h-5 bg-[#d9d9d9] rounded-full overflow-hidden">
              <div class="h-full bg-[#5BF09F] transition-all" :style="{ width: progressPercentage + '%' }"></div>
            </div>

            <div class="text-center text-xs font-bold text-gray-700 mt-1">
              Progress
            </div>
          </div>
        </div>
      </div>

      <div v-if="videos.length > 0" class="flex flex-col items-center gap-8">

        <h2 class="w-full max-w-lg text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 text-center md:text-left">
          Level {{ currentUserLevel }}
        </h2>

        <div v-for="video in videos" :key="video.id" class="flex flex-col items-center w-full max-w-lg gap-4">

          <a :href="video.videoUrl" target="_blank" rel="noopener noreferrer"
            class="w-full aspect-video bg-[#d9d9d9] rounded-2xl relative flex items-center justify-center overflow-hidden">
            <img v-if="video.videoUrl" :src="getYoutubeThumbnail(video.videoUrl)" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/20"></div>
            <svg class="w-20 h-20 text-black fill-current relative" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>

          <span class="font-bold text-gray-900 text-center">{{ video.title }}</span>

          <button @click="toggleComplete(video.id)"
            :class="isComplete(video.id) ? 'bg-gray-300 text-gray-600' : 'bg-[#5BF09F] text-black'"
            class="font-bold text-lg px-8 py-2 rounded-full hover:brightness-95 transition">
            {{ isComplete(video.id) ? 'Completed' : 'Mark Complete' }}
          </button>

        </div>

      </div>

    </div>
  </div>
</template>
