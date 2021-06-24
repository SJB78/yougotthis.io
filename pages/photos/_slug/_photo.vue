<template>
  <div class="wrapper">
    <h1 class="page-title">Photo from {{ event.title }}</h1>
    <p class="text-lg">
      Taken by {{ event.photographer }} on
      {{ $moment(event.date).format('ddd Do MMM YYYY') }} in
      {{ event.location }}
    </p>
    <div class="mb-16 mt-4 lg:mt-16">
      <nuxt-img
        :src="`/img/photos/${event.photos}/${photo.filename}`"
        width="1100px"
      />
      <p class="mt-4">{{ photo.alt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  asyncData({ store, params }) {
    const event = store.state.events.past.find(
      (event) => event.photos === params.slug
    )
    const photo = store.state.photos[params.slug].find(
      (p) => p.filename.split('.')[0] === params.photo
    )
    return { event, photo }
  },
}
</script>
