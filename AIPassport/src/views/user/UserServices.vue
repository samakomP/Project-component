<script setup lang="ts">

import CardBase from '@/components/CardBase.vue'
import PillLevel from '@/components/PillLevel.vue'


</script>

<template>
 <div class="max-w-7xl min-h-[85vh] mx-auto p-5 mt-7">
 
    <div class="md:col-span-2 flex flex-col gap-8">
      <CardBase class="relative text-center p-18">
               <PillLevel class="absolute top-5 right-6 text-2xl">
                    Level 2
                </PillLevel>
            </CardBase>
        </div>
    </div>
</template>
