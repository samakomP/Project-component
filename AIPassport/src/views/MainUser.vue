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
          
          <RouterLink to="/e-learning" class="bg-gray-200 rounded-[17px] p-12 flex flex-col items-center justify-center gap-4 shadow-sm hover:opacity-80 transition">
            <svg class="w-20 h-20 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="Orange" class="inline-block w-8 h-8 z-10 rotate-18">
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
            </svg>


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