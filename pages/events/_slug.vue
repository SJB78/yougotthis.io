<template>
  <div class="wrapper grid grid-cols-5 gap-6 pb-14">
    <aside class="col-span-2">
      <div>
        <img :src="`/img/events/og/${event.logo}`" alt="" />
        <div class="bg-gray-100 p-4">
          <h1 class="font-bold text-2xl">{{ event.title }}</h1>
          <div class="space-x-4 text-sm my-2">
            <span>{{ $moment(event.date).format('dddd MMMM Mo YYYY') }}</span>
            <span>{{ event.location }}</span>
            <span>{{ event.type }}</span>
          </div>
          <p>{{ event.short }}</p>
          <a
            class="btn"
            :class="{ disabled: !event.register }"
            :href="event.register"
            >{{ event.register ? 'Get a ticket' : 'Tickets available soon' }}</a
          >
        </div>
      </div>
    </aside>

    <main class="col-span-3">
      <div
        v-for="talk in event.talks"
        :key="talk.title"
        class="mb-4 bg-gray-100 border border-gray-300"
      >
        <div class="p-4 border-b border-gray-300">
          <h2 class="text-xl mb-2 font-bold">{{ talk.title }}</h2>
          <h3 class="flex items-center">
            <span>{{ talk.speaker.name }}</span>
            <a
              v-if="talk.speaker.twitter"
              :href="`https://twitter.com/${talk.speaker.twitter}`"
            >
              <Twitter class="h-4 ml-2" />
            </a>
          </h3>
        </div>
        <div class="p-4">
          <p>{{ talk.abstract }}</p>
        </div>
        <div class="p-4 border-t border-gray-300">
          <details class="cursor-pointer">
            <summary>About {{ talk.speaker.name }}</summary>
            <p class="mt-2">{{ talk.speaker.bio }}</p>
          </details>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const event = await $content('events', params.slug).fetch()
    return { event }
  },
}
</script>

<style scoped>
.btn {
  @apply bg-pink-500 px-4 py-2 text-white text-lg w-full mt-4 block text-center;
}
.btn.disabled {
  @apply border-2 border-pink-500 bg-transparent text-pink-500 !important;
}
</style>
