<template>
  <div class="w-full h-full flex flex-col bg-gray-100 rounded-[40px] shadow-sm">

    <header v-if="$slots.header" class="mb-8 shrink-0">
      <slot name="header"></slot>
    </header>

    <main class="grow">
      <slot name="default"></slot>
    </main>

  </div>
</template>
