<template>
  <div class="wrapper lg:grid lg:grid-cols-5 gap-6 pb-14">
    <aside class="lg:col-span-2 mb-8 lg:mb-0">
      <nuxt-img
        :src="`/img/events/og/${event.logo}`"
        alt=""
        sizes="lg:450px sm:100vw"
      />
      <div
        class="
          bg-gray-100
          dark:bg-gray-800
          p-4
          border border-t-0 border-gray-300
          dark:border-gray-600
          event-meta
        "
      >
        <h1 class="text-4xl">{{ event.title }}</h1>
        <div class="space-x-4 text-sm my-2">
          <span
            >{{ $moment(event.date).format('dddd MMMM Do YYYY') }}
            {{ event.time }}</span
          >
          <span>{{ event.location }}</span>
          <span>{{ event.type }}</span>
        </div>
        <p>{{ event.short }}</p>
        <div>
          <a
            v-for="link in event.links"
            :key="link.text"
            class="btn"
            :class="{ disabled: !link.url }"
            :href="link.url"
            >{{ link.text }}</a
          >
        </div>
        <div v-if="event.sponsors">
          <h2 class="mt-8 mb-2 font-bold text-lg">Event supported by</h2>
          <div
            class="grid gap-2 w-full"
            :class="{
              'grid-cols-2':
                event.sponsors.length % 2 == 0 || event.sponsors.length == 1,
              'grid-cols-2 sm:grid-cols-3':
                event.sponsors.length % 1 == 0 && event.sponsors.length > 1,
            }"
          >
            <a
              v-for="sponsor of eventSponsors"
              :key="sponsor.file"
              :href="sponsor.url"
            >
              <nuxt-img
                :src="`/img/sponsors/${sponsor.file}.png`"
                :alt="sponsor.name"
                class="w-full"
              />
            </a>
          </div>
        </div>
      </div>
    </aside>

    <main class="col-span-3">
      <div
        v-for="talk in event.talks"
        :key="talk.title"
        class="
          mb-4
          bg-gray-100
          border border-gray-300
          dark:bg-gray-800
          dark:border-gray-600
          talk
        "
      >
        <div class="p-4 border-b border-gray-300 dark:border-gray-600">
          <h2 class="text-3xl mb-2">{{ talk.title }}</h2>
          <h3 class="flex items-center">
            <span>{{ talk.speaker.name }}</span>
            <a
              v-if="talk.speaker.twitter"
              :href="`https://twitter.com/${talk.speaker.twitter}`"
              aria-label="Twitter"
            >
              <Twitter class="h-4 ml-2" />
            </a>
          </h3>
        </div>
        <div class="p-4">
          <p>{{ talk.abstract }}</p>
        </div>
        <div class="p-4 border-t border-gray-300 dark:border-gray-600">
          <details class="cursor-pointer">
            <summary>About {{ talk.speaker.name }}</summary>
            <p class="mt-2">{{ talk.speaker.bio }}</p>
          </details>
        </div>
      </div>
    </main>
    <style v-if="event.css">
      {{event.css}}
    </style>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, store, params }) {
    const event = await $content('events', params.slug).fetch()
    const allSponsors = store.state.sponsors.list
    let eventSponsors
    if (event.sponsors) {
      eventSponsors = allSponsors.filter((sponsor) => {
        return event.sponsors.find((e) => e === sponsor.file)
      })
    }
    return { event, eventSponsors }
  },
  head() {
    const image = this.event.image ? this.event.image : '/img/brand/events.png'
    const link = []
    if (this.event.cssFile)
      link.push({ rel: 'stylesheet', href: this.event.cssFile })
    return {
      title: `${this.event.title} | ${process.env.title}`,
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + image,
        },
        {
          hid: 'description',
          name: 'description',
          content: this.event.short,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.event.short,
        },
      ],
      link,
    }
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
