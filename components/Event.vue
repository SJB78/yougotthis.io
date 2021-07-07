<template>
  <div>
    <a
      v-if="!event.save_the_date"
      :href="event.slug ? `/events/${event.slug}` : event.url"
      class="border-2 w-full flex flex-col"
      :class="{
        'border-gray-800': event.slug,
        'border-gray-200 dark:border-gray-800': !event.slug,
      }"
    >
      <nuxt-img :src="`/img/events/og/${event.logo}`" alt="" width="600px" />
      <div class="p-4 flex-1 flex flex-col justify-between dark:bg-gray-800">
        <h2 class="font-bold mb-2" :class="{ 'text-2xl': !slim }">
          {{ event.title }}
        </h2>
        <div class="text-xs">
          <span v-if="event.customDate">{{ event.customDate }}</span>
          <span v-else>{{
            $moment(event.date).format('ddd Do MMM YYYY')
          }}</span>
        </div>
      </div>
    </a>
    <div
      v-if="event.save_the_date"
      class="border-2 border-gray-200 dark:border-gray-800 w-full flex flex-col"
    >
      <div class="relative">
        <img :src="`/img/events/og/${event.logo}`" alt="" />
        <span
          class="
            absolute
            top-2
            left-2
            bg-indigo-100
            text-gray-800 text-xs
            px-3
            py-1
            rounded-full
          "
          >Save the date</span
        >
      </div>
      <div
        class="
          p-4
          flex-1 flex flex-col
          justify-between
          bg-gray-100
          dark:bg-gray-500
        "
      >
        <h2 class="font-bold mb-2" :class="{ 'text-2xl': !slim }">
          {{ event.title }}
        </h2>
        <div class="text-xs">
          <span v-if="event.customDate">{{ event.customDate }}</span>
          <span v-else>{{
            $moment(event.date).format('ddd Do MMM YYYY')
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true,
    },
    slim: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
}
</script>
