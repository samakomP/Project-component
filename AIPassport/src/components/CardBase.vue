<template>
  <div class="w-full max-w-7xl mx-auto bg-gray-100 rounded-[2.5rem] p-8 md:p-12 shadow-sm h-fit">
    <header v-if="$slots.header" class="mb-8">
        <slot name="header"></slot>
      </header>
      
      <main>
        <slot name="default"></slot>
      </main>
  </div>
</template>