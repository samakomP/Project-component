<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'
</script>

<template>
  <div class="w-full flex flex-col items-center mt-2 px-4 pb-8 font-serif">
    
    <div class="w-full max-w-2xl flex flex-col gap-6">
      

      <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 relative flex flex-col gap-6">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          
          <PillLevel class="text-xl font-bold">
            Level 3
          </PillLevel>


          <div class="text-center md:text-left">
            <span class="text-gray-600 text-sm block">Attempt Time :</span>
            <span class="font-bold text-gray-900 text-base">18-07-2026</span>
          </div>

          <div class="bg-[#5BF09F] text-[#003366] font-bold text-xl px-10 py-2 rounded-full shadow-sm text-center">
            Pass
          </div>

        </div>

        <div class="flex justify-around items-center border-t border-gray-300 pt-4 text-base">
          <div>
            <span class="text-gray-700">Correct Answer :</span> 
            <span class="font-bold text-gray-900 ml-2">4</span>
          </div>
          <div>
            <span class="text-gray-700">Wrong Answer :</span> 
            <span class="font-bold text-gray-900 ml-2">0</span>
          </div>
        </div>

      </CardBase>


      <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 relative flex flex-col gap-6">
        
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          

          <PillLevel class="text-xl font-bold">
            Level 3
          </PillLevel>

          <div class="text-center md:text-left">
            <span class="text-gray-600 text-sm block">Attempt Time :</span>
            <span class="font-bold text-gray-900 text-base">13-07-2026</span>
          </div>

          <div class="bg-[#FF7A33] text-white font-bold text-xl px-10 py-2 rounded-full shadow-sm text-center">
            Fail
          </div>

        </div>

        <div class="flex justify-around items-center border-t border-gray-300 pt-4 text-base">
          <div>
            <span class="text-gray-700">Correct Answer :</span> 
            <span class="font-bold text-gray-900 ml-2">4</span>
          </div>
          <div>
            <span class="text-gray-700">Wrong Answer :</span> 
            <span class="font-bold text-gray-900 ml-2">0</span>
          </div>
        </div>

      </CardBase>

    </div>
  </div>
</template>