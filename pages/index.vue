<template>
  <div>
    <div class="wrapper mb-16">
      <h1 class="page-title">
        You Got This is a community event series focused on discussing core
        skills needed for a happy, healthy work life.
      </h1>
      <p class="text-xl lg:text-2xl my-6">
        We talk about the skills you don't get taught and just have to work out
        - it shouldn't have to be this way. Discover talks, workshops, and
        social events around our core community themes.
      </p>
      <ul class="flex flex-wrap">
        <li v-for="tag in tags" :key="tag.name" class="tag">
          <n-link :to="`/talks?tag=${tag.name}`">{{
            tag.name.toLowerCase().split('-').join(' ')
          }}</n-link>
        </li>
      </ul>
      <Newsletter />
    </div>

    <div class="wrapper mb-16">
      <h2 class="text-2xl lg:text-4xl font-bold">
        New here? Check these talks out.
      </h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Talk
          v-for="talk in talks"
          :key="talk.slug"
          :talk="talk"
          :slim="true"
        />
      </div>
    </div>

    <div class="wrapper mb-16">
      <h2 class="text-2xl lg:text-4xl font-bold">
        Drop in next time we're around.
      </h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        <Event
          v-for="event in events"
          :key="event.date"
          :event="event"
          class="flex"
        />
      </div>
    </div>
    <Testimonials />
    <div class="wrapper mb-16">
      <h2 class="text-2xl lg:text-4xl font-bold">Cheers to our supporters.</h2>
      <div
        class="
          mt-4
          grid
          gap-1
          grid-cols-3
          sm:grid-cols-4
          md:grid-cols-5
          lg:grid-cols-6
        "
      >
        <a
          v-for="sponsor of $store.state.sponsors.list"
          :key="sponsor.file"
          :href="sponsor.url"
        >
          <img :src="`/img/sponsors/${sponsor.file}.png`" :alt="sponsor.name" />
        </a>
      </div>
    </div>
    <div class="wrapper mb-16">
      <h2 class="text-2xl lg:text-4xl font-bold">Hear it first.</h2>
      <Newsletter />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, store }) {
    const tags = store.state.tags.list.filter((tag) => tag.type === 'theme')
    const talks = await $content('talks')
      .sortBy('date', 'desc')
      .where({
        highlight: true,
      })
      .fetch()
    const events = await $content('events')
      .sortBy('date', 'asc')
      .limit(3)
      .fetch()
    return {
      tags,
      talks,
      events,
    }
  },
}
</script>

<style scoped>
.tag a {
  @apply bg-indigo-100 mr-4 mb-4 text-base lg:text-xl py-1 px-4 lg:py-2 rounded-full inline-block dark:bg-gray-800;
}
</style>
