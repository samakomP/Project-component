<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans bg-gray-50">
    <div class="box">
      <header v-if="$slots.header" class="mb-8">
        <slot name="header"></slot>
      </header>
      
      <main>
        <slot name="default"></slot>
      </main>

      <footer v-if="$slots.footer" class="mt-8">
        <slot name="footer"></slot>
      </footer>

    </div>
  </div>
</template>
