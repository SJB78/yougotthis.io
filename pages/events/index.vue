<template>
  <div class="wrapper">
    <h1 class="page-title">Upcoming Events</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 mt-8 mb-16 gap-4">
      <Event
        v-for="event in events"
        :key="event.date"
        :event="event"
        class="flex"
      />
    </div>
    <h2 class="page-subtitle">Past Events</h2>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 mt-8 mb-16 gap-4">
      <Event
        v-for="event in past"
        :key="event.date"
        :event="event"
        class="flex"
      />
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $content, store }) {
    let events = await $content('events')
      .where({ past: { $ne: true } })
      .fetch()
    events = events.sort((a, b) => new Date(a.date) - new Date(b.date))
    const past = store.state.events.past
    past.map((event) => {
      return { ...event, og: `/img/events/og/${event.og}` }
    })
    return { events, past }
  },
  head() {
    return {
      title: `Events | ${process.env.title}`,
      meta: [
        {
          hid: 'og:image',
          property: 'og:image',
          content: process.env.baseUrl + '/img/brand/events.png',
        },
      ],
    }
  },
}
</script>
