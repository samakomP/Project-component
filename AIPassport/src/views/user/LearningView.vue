<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const currentUserLevel = computed(() => user.value?.level || 1)

function getYoutubeThumbnail(url: string) {
  if (!url) return ''
  const match = url.match(/(?:v=|youtu\.be\/)([\w-]{11})/)
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : ''
}

type Video = {
  id: number
  youtubeUrl: string
  isComplete: boolean
}

type Level = {
  level: number
  levelName: string
  videos: Video[]
}

const elearningData = ref<Level[]>([
  {
    level: 1,
    levelName: 'Level 1',
    videos: [
      { id: 1, youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', isComplete: true },
      { id: 2, youtubeUrl: 'https://www.youtube.com/watch?v=jNQXAC9IVRw', isComplete: true }
    ]
  },
  {
    level: 2,
    levelName: 'Level 2',
    videos: [
      { id: 3, youtubeUrl: 'https://youtu.be/M7lc1UVf-VE', isComplete: false },
      { id: 4, youtubeUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ', isComplete: false }
    ]
  },
  {
    level: 3,
    levelName: 'Level 3',
    videos: [
      { id: 5, youtubeUrl: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0', isComplete: false }
    ]
  }
])

const currentLevelBlock = computed(() =>
  elearningData.value.find(level => level.level === currentUserLevel.value)
)

const progressPercentage = computed(() => {
  const videos = currentLevelBlock.value?.videos ?? []
  if (videos.length === 0) return 0
  const completedVideos = videos.filter(v => v.isComplete).length
  return Math.round((completedVideos / videos.length) * 100)
})

function toggleComplete(video: Video) {
  video.isComplete = !video.isComplete
}
</script>

<template>
  <div class="w-full flex flex-col items-center mt-4 px-4 pb-12 font-serif">

    <div class="w-full max-w-3xl bg-[#f2f2f2] rounded-[40px] p-8 md:p-12 shadow-sm flex flex-col gap-12">

      <router-link :to="{ name: 'userhome-view', params: { id: user?.id } }"
        class="self-start bg-[#FCC084] text-[#003366] font-bold text-lg px-6 py-2 rounded-full hover:opacity-80 transition">
        &larr; Home
      </router-link>

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

      <div v-if="currentLevelBlock" class="flex flex-col items-center gap-8">

        <h2 class="w-full max-w-lg text-2xl font-bold text-gray-900 border-b-2 border-gray-300 pb-2 text-center md:text-left">
          {{ currentLevelBlock.levelName }}
        </h2>

        <div v-for="video in currentLevelBlock.videos" :key="video.id" class="flex flex-col items-center w-full max-w-lg gap-4">

          <a :href="video.youtubeUrl" target="_blank" rel="noopener noreferrer"
            class="w-full aspect-video bg-[#d9d9d9] rounded-2xl relative flex items-center justify-center overflow-hidden">
            <img v-if="video.youtubeUrl" :src="getYoutubeThumbnail(video.youtubeUrl)" alt="Video Thumbnail" class="absolute inset-0 w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/20"></div>
            <svg class="w-20 h-20 text-black fill-current relative" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </a>

          <button @click="toggleComplete(video)"
            :class="video.isComplete ? 'bg-gray-300 text-gray-600' : 'bg-[#5BF09F] text-black'"
            class="font-bold text-lg px-8 py-2 rounded-full hover:brightness-95 transition">
            {{ video.isComplete ? 'Completed' : 'Mark Complete' }}
          </button>

        </div>

      </div>

    </div>
  </div>
</template>
