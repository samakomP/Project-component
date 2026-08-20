<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'
</script>

<template>
  <div class="w-full flex flex-col items-center mt-2 px-4 pb-8 font-serif">
    
    <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-10 tracking-wide">
      Your All Achievement
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7 w-full max-w-2xl">
      
      <CardBase class="!bg-[#9ef0c6] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4 transition">
        <span class="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-snug">
          Level 1<br>Pass!
        </span>
      </CardBase>

      <CardBase class="!bg-[#9ef0c6] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4 transition">
        <span class="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-snug">
          Level 2<br>Pass!
        </span>
      </CardBase>


      <CardBase class="!bg-[#dcdcdc] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4">
        <span class="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-snug">
          Level 3
        </span>
      </CardBase>

      <CardBase class="!bg-[#dcdcdc] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4">
        <span class="text-2xl md:text-3xl font-bold text-gray-900 text-center leading-snug">
          Level 4
        </span>
      </CardBase>

      <CardBase class="!bg-[#dcdcdc] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4">

      </CardBase>

      <CardBase class="!bg-[#dcdcdc] !rounded-[30px] !shadow-none aspect-square flex items-center justify-center p-4">

      </CardBase>

    </div>
  </div>
</template>