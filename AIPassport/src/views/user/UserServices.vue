<script setup lang="ts">
import CardBase from '@/components/CardBase.vue'
</script>

<template>
  <div class="w-full flex flex-col gap-10 mt-2 px-2 md:px-6 font-serif">
    
    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Services :</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6">
          <h3 class="font-bold text-xl text-black leading-tight">Private Consultation</h3>
          <p class="text-black font-medium mt-1 mb-4 leading-tight">One-on-one sessions</p>
          <p class="text-sm text-gray-600 font-sans">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
          </p>
        </CardBase>
        
        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6">
          <h3 class="font-bold text-xl text-black leading-tight">Expert Resources</h3>
          <p class="text-black font-medium mt-1 mb-4 leading-tight">Premium content library</p>
          <p class="text-sm text-gray-600 font-sans">
            Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
          </p>
        </CardBase>
        
        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6">
          <h3 class="font-bold text-xl text-black leading-tight">Networking Events</h3>
          <p class="text-black font-medium mt-1 mb-4 leading-tight">Exclusive networking</p>
          <p class="text-sm text-gray-600 font-sans">
            Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus tristique posuere.
          </p>
        </CardBase>

      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold text-gray-900 mb-6 mt-4">Benefits :</h2>
      

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        
        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 text-center flex flex-col justify-start">
          <h3 class="font-bold text-lg text-black leading-snug mb-3">24/7 Premium<br>support</h3>
          <p class="text-xs text-gray-600 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 text-center flex flex-col justify-start">
          <h3 class="font-bold text-lg text-black leading-snug mb-3">One-on-one<br>mentoring</h3>
          <p class="text-xs text-gray-600 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 text-center flex flex-col justify-start">
          <h3 class="font-bold text-lg text-black leading-snug mb-3">Networking<br>events</h3>
          <p class="text-xs text-gray-600 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </CardBase>

        <CardBase class="!bg-[#e6e6e6] !rounded-[30px] !shadow-none p-6 text-center flex flex-col justify-start">
          <h3 class="font-bold text-lg text-black leading-snug mb-3">Gold<br>certificate</h3>
          <p class="text-xs text-gray-600 font-sans">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </CardBase>

      </div>
    </div>

  </div>
</template>
