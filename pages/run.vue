<template>
  <div class="wrapper">
    <h1 class="page-title">{{ content.title }}</h1>
    <nuxt-content :document="content" class="prose mt-12 mb-24 max-w-full" />
  </div>
</template>

<script>
export default {
  async asyncData({ $content }) {
    const content = await $content('static', 'run').fetch()
    return { content }
  },
  head() {
    return {
      title: `${this.content.title} | ${process.env.title}`,
    }
  },
}
</script>
