<template>
  <div class="wrapper">
    <h1 class="page-title">Photos from {{ event.title }}</h1>
    <p class="text-lg">
      Taken by {{ event.photographer }} on
      {{ $moment(event.date).format('ddd Do MMM YYYY') }} in
      {{ event.location }}
    </p>
    <div class="mb-16 mt-4 lg:mt-16 columns">
      <nuxt-link
        v-for="photo in photos"
        :key="photo.filename"
        :to="`/photos/${event.photos}/${photo.filename.split('.')[0]}`"
        class="mb-2 inline-block"
      >
        <nuxt-img
          :src="`/img/photos/${event.photos}/${photo.filename}`"
          width="100%"
        />
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, params }) {
    const event = store.state.events.past.find(
      (event) => event.photos === params.slug
    )
    const photos = store.state.photos[params.slug]
    return { event, photos }
  },
}
</script>

<style scoped>
.columns {
  columns: 2;
}
@media (min-width: 768px) {
  .columns {
    columns: 3;
  }
}
@media (min-width: 1024px) {
  .columns {
    columns: 4;
  }
}
@media (min-width: 1280px) {
  .columns {
    columns: 5;
  }
}
</style>
