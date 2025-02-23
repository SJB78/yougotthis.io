<template>
  <div class="wrapper">
    <h1 class="page-title">{{ talk.talk.title }}</h1>
    <p class="text-lg">
      Presented by {{ talk.speakers.map((s) => s.name).join(' & ') }}
    </p>

    <div v-if="talk.mux">
      <div class="w-full mt-4 lg:mt-16 border-2 border-indigo-700">
        <vue-plyr>
          <video ref="videoStreaming" controls crossorigin playsinline>
            <source src="" />
          </video>
        </vue-plyr>
      </div>
      <p class="text-right text-sm text-gray-700 dark:text-white">
        Video hosting kindly provided by
        <a
          class="text-indigo-700 dark:text-white dark:underline"
          href="https://mux.com/"
          >Mux - video for developers</a
        >
      </p>
    </div>

    <div v-if="talk.vimeo">
      <iframe :src="`https://player.vimeo.com/video/${talk.vimeo}?h=44d49687ad&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`" frameborder="0" allow="fullscreen; picture-in-picture" allowfullscreen class="w-full lg:mt-16 border-2 border-indigo-700" style="aspect-ratio: 16/9"></iframe>
    </div>

    <div
      class="
        flex flex-col-reverse
        lg:grid lg:grid-cols-5
        lg:flex-row
        gap-8
        lg:mt-16
      "
    >
      <main v-if="talk.body.children.length > 0" class="col-span-3">
        <h2 class="text-3xl font-bold">Transcript</h2>
        <small
          ><p class="text-sm italic pt-4">
            If you spot any errors in our transcript please feel free to
            <a
              class="text-pink-600 dark:text-white dark:underline"
              :href="`https://github.com/yougotthisconf/delta.yougotthis.io/tree/main/content/talks/${talk.slug}.md`"
              >submit a pull request</a
            >
            with amendments.
          </p></small
        >
        <article>
          <nuxt-content :document="talk" class="prose mt-4 max-w-full mb-16" />
        </article>
      </main>
      <aside
        :class="{
          'col-span-2': talk.body.children.length > 0,
          'col-span-5 grid lg:grid-cols-3 gap-x-8':
            talk.body.children.length == 0,
        }"
      >
        <div class="mb-8">
          <h2 class="font-bold text-3xl">About the talk</h2>
          <p class="mt-4 mb-2 text-sm leading-relaxed">
            {{ talk.talk.abstract }}
          </p>
          <div class="py-2">
            <n-link
              v-for="tag in tags"
              :key="tag"
              class="tag"
              :to="`/talks?tag=${tag}`"
            >
              {{ tag.split('-').join(' ') }}
            </n-link>
          </div>
        </div>

        <div v-for="speaker in talk.speakers" :key="speaker.name" class="mb-12">
          <h2 class="font-bold text-3xl">About {{ speaker.name }}</h2>
          <p class="my-4 text-sm leading-relaxed">
            {{ speaker.bio }}
          </p>
          <div class="flex space-x-3 items-center">
            <img
              :src="`/img/people/${speaker.photo}`"
              :alt="`Image of ${speaker.name}`"
              class="h-10 rounded-full"
            />
            <div>
              <p>{{ speaker.name }}</p>
              <a
                v-if="speaker.twitter"
                :href="`https://twitter.com/${speaker.twitter}`"
                class="text-gray-700 dark:text-gray-200 text-sm block"
              >
                @{{ speaker.twitter }}
              </a>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="font-bold text-3xl">About the event</h2>
          <div class="flex space-x-3 items-center my-4">
            <img :src="eventLogo" :alt="`${talk.event} logo`" class="h-10" />
            <div>
              <p>{{ talk.event }}</p>
              <span class="text-gray-700 dark:text-gray-200 text-sm block">{{
                $moment(talk.date).format('Do MMM YYYY')
              }}</span>
            </div>
          </div>
          <n-link
            :to="`/talks?tag=${event.tag}`"
            class="
              bg-pink-200
              px-3
              py-1.5
              text-sm text-center
              rounded-full
              dark:text-black
            "
            >View all talks from this event</n-link
          >
          <div v-if="event.sponsors">
            <h2 class="mt-8 mb-2 font-bold text-lg">Event supported by</h2>
            <div
              class="grid gap-2 w-full"
              :class="{
                'grid-cols-2': sponsors.length % 2 == 0 || sponsors.length == 1,
                'grid-cols-2 sm:grid-cols-3':
                  sponsors.length % 2 != 0 && sponsors.length > 1,
              }"
            >
              <a
                v-for="sponsor of sponsors"
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
    </div>
  </div>
</template>

<script>
import Hls from 'hls.js'
import Plyr from 'plyr'

export default {
  async asyncData({ store, $content, params }) {
    const talk = await $content('talks', params.slug).fetch()

    const event = store.state.events.past.find((e) => e.title === talk.event)
    const eventLogo = `/img/events/icons/${event.icon}`

    const themeTags = store.state.tags.list.filter((t) => t.type === 'theme')
    const tags = talk.tags.filter((t) => themeTags.find((u) => u.name === t))

    const allSponsors = store.state.sponsors.list
    const eventSponsorNames = event.sponsors || []
    const sponsors = allSponsors.filter((s) =>
      eventSponsorNames.find((e) => s.file === e)
    )

    return { talk, eventLogo, tags, event, sponsors }
  },
  data() {
    return {
      playerOptions: {
        controls: [
          'play-large',
          'current-time',
          'play',
          'mute',
          'volume',
          'progress',
          'settings',
          'fullscreen',
        ],
        settings: ['quality', 'speed', 'loop'],
      },
    }
  },
  head() {
    const base = {
      link: [{ rel: 'stylesheet', href: '/css/plyr.css' }],
      title: `${this.talk.talk.title} | ${process.env.title}`,
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + '/img/brand/talks.png',
        },
      ],
    }
    if(this.talk.vimeo) base.script = [{ src: 'https://player.vimeo.com/api/player.js' }]
    return base
  },
  mounted() {
    if(this.talk.mux) this.videoStreaming()
  },
  methods: {
    videoStreaming() {
      const url = `https://stream.mux.com/${this.talk.mux}.m3u8`
      const video = this.$refs.videoStreaming
      const defaultOptions = {}
      if (Hls.isSupported()) {
        const hls = new Hls()
        hls.loadSource(url)
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
          const availableQualities = hls.levels.map((l) => l.height)
          defaultOptions.quality = {
            default: availableQualities[0],
            options: availableQualities,
            forced: true,
            onChange: (e) => updateQuality(e),
          }
          new Plyr(video, defaultOptions) // eslint-disable-line
        })

        hls.attachMedia(video)
        window.hls = hls
      } else {
        new Plyr(video, defaultOptions) // eslint-disable-line
      }

      function updateQuality(newQuality) {
        window.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            window.hls.currentLevel = levelIndex
          }
        })
      }
    },
  },
}
</script>

<style>
:root {
  --plyr-color-main: #4338ca;
}
</style>

<style scoped>
.tag {
  @apply inline-block rounded-full px-3 py-1 text-sm mr-2 mb-2 bg-indigo-100 lowercase text-center text-black;
}
.tag-upper {
  @apply capitalize !important;
}
</style>
