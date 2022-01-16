<template>
  <n-link
    :to="`/talks/${talk.slug}`"
    class="
      border-2 border-gray-200
      w-full
      flex flex-col
      justify-between
      dark:border-gray-800
      dark:bg-gray-800
    "
    :class="{ 'p-4 lg:p-8': !slim, 'p-4': slim }"
  >
    <h3 class="font-bold mb-4" :class="{ 'md:text-2xl': !slim }">
      {{ talk.talk.title }}
    </h3>
    <p v-if="!slim" class="mb-6 text-sm hidden md:block">
      {{ talk.talk.abstract }}
    </p>
    <div class="flex space-x-3 talks-center">
      <img
        v-for="speaker in talk.speakers"
        :key="speaker.name"
        :src="`/img/people/${speaker.photo}`"
        :alt="`Image of ${speaker.name}`"
        class="h-10 rounded-full"
      />
      <div class="flex flex-col justify-center leading-5">
        <p>{{ talk.speakers.map((s) => s.name).join(' & ') }}</p>
        <p class="text-gray-700 dark:text-gray-200 text-sm">
          {{
            talk.speakers
              .map((s) => s.twitter)
              .filter((s) => s)
              .map((s) => '@' + s)
              .join(' & ')
          }}
        </p>
      </div>
    </div>
  </n-link>
</template>

<script>
export default {
  props: {
    talk: {
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
