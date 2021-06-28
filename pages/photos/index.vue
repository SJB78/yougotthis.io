<template>
  <div class="wrapper">
    <h1 class="page-title">Event Photos</h1>
    <div class="grid sm:grid-cols-2 lg:grid-cols-3 mt-8 mb-16 gap-4">
      <Event
        v-for="event in events"
        :key="event.date"
        :event="event"
        :href="`/photos/${event.photos}`"
        class="flex"
      />
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    const allEvents = store.state.events.past
    const hasPhotos = Object.keys(store.state.photos)
    const events = allEvents
      .filter((event) => hasPhotos.includes(event.photos))
      .map((event) => {
        return { ...event, url: `/photos/${event.photos}` }
      })
    return { events }
  },
  head() {
    return {
      title: `Photos | ${process.env.title}`,
    }
  },
}
</script>
