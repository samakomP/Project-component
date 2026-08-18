<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="max-w-6xl mx-auto p-6 mt-4">
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      

      <div class="md:col-span-2 flex flex-col gap-8">
        

        <div class="bg-gray-200 rounded-[17px] p-28 text-center shadow-sm">
          <h1 class="text-4xl font-serif text-gray-900 mb-4">Welcome back!</h1>
          <p class="text-xl font-bold text-gray-900">I've got some jobs ready for you.</p>
        </div>


        <div class="grid grid-cols-2 gap-8">
          
          <RouterLink to="/e-learning"
                        class="bg-gray-200 rounded-[17px] p-12 flex flex-col items-center justify-center gap-4 shadow-sm hover:opacity-80 transition">
                        <div class="relative w-20 h-20">
                            <svg class="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                                </path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange"
                                class="absolute -top-6 -right-3 w-12 h-15 z-10 rotate-18">
                                <path
                                    d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                                <path
                                    d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                                <path
                                    d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                            </svg>

                        </div>
                        <h2 class="text-2xl font-bold text-gray-900">E-Learning</h2>
                    </RouterLink>

    
          <RouterLink to="/exam" class="bg-gray-200 rounded-[17px] p-12 flex flex-col items-center justify-center gap-4 shadow-sm hover:opacity-80 transition">
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-18 h-18">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                        </svg>

            <h2 class="text-2xl font-bold text-gray-900">Exam</h2>
          </RouterLink>

        </div>
      </div>


      <RouterLink to="/benefits" class="bg-[#e5e7eb] rounded-[17px] p-8 text-center shadow-sm flex flex-col items-center hover:opacity-90 transition">
        <p class="text-gray-500 font-medium mb-2">You're current level at</p>
        <h2 class="text-5xl font-black text-gray-900 mb-8">Level 2</h2>
        
        <!-- Need to put for db.json-->
        <div class="flex flex-col gap-6 w-full max-w-50">
          <div class="bg-green-400 text-white font-semibold text-xl py-4 rounded-full w-full">Level 1</div>
          <div class="bg-green-400 text-white font-bold text-xl py-4 rounded-full w-full">Level 2</div>
          <div class="bg-gray-300 text-white font-bold text-xl py-4 rounded-full w-full">Level 3</div>
          <div class="bg-gray-300 text-white font-bold text-xl py-4 rounded-full w-full">Level 4</div>
        </div>
      </RouterLink>

    </div>
  </div>
</template>