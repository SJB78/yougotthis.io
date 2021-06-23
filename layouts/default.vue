<template>
  <div class="min-h-screen flex flex-col dark:bg-black dark:text-white">
    <TheHeader />
    <div class="flex-1 w-full pt-16">
      <Nuxt />
    </div>
    <TheFooter />
  </div>
</template>

<style>
.wrapper {
  @apply max-w-6xl mx-auto px-4;
}

.page-title {
  @apply text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold;
  @apply leading-tight !important;
}
.page-subtitle {
  @apply text-2xl md:text-3xl lg:text-4xl font-bold;
  @apply leading-tight !important;
}

html.dark .prose * {
  @apply text-white;
}
</style>
