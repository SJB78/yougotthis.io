<template>
  <div class="wrapper mb-16">
    <h1 class="page-title mb-8">Talk Library</h1>
    <div class="flex flex-col mb-8">
      <label for="filter">Filter by theme or event</label>
      <select
        id="filter"
        class="border-2 border-gray-400 focus:border-indigo-700"
        @change="changeFilter($event)"
      >
        <option value="all">Show All</option>
        <optgroup label="Themes">
          <option
            v-for="tag in tags.themes"
            :key="tag.name"
            :value="tag.name"
            :selected="filter === tag.name"
          >
            {{ formatTag(tag.name) }}
          </option>
        </optgroup>
        <optgroup label="Events">
          <option
            v-for="tag in tags.events"
            :key="tag.name"
            :value="tag.name"
            :selected="filter === tag.name"
          >
            {{ formatTag(tag.name) }}
          </option>
        </optgroup>
      </select>
    </div>

    <Talk
      v-for="talk in filteredTalks"
      :key="talk.slug"
      :talk="talk"
      class="mb-4 lg:mb-8"
    />
  </div>
</template>

<script>
export default {
  async asyncData({ $content, store }) {
    const talks = await $content('talks').sortBy('date', 'desc').fetch()
    const tags = {
      events: store.state.tags.list.filter((tag) => tag.type === 'event'),
      themes: store.state.tags.list.filter((tag) => tag.type === 'theme'),
    }
    return { talks, tags }
  },
  data() {
    return {
      filter: 'all',
    }
  },
  computed: {
    filteredTalks() {
      if (this.filter === 'all') return this.talks
      else {
        return this.talks.filter((talk) => talk.tags.includes(this.filter))
      }
    },
  },
  watch: {
    '$route.query'(query) {
      if (!query.tag) this.filter = 'all'
    },
  },
  created() {
    if (this.$route.query.tag) this.filter = this.$route.query.tag
  },
  methods: {
    changeFilter(event) {
      this.filter = event.target.value
      if (this.filter !== 'all') {
        this.$router.push({
          path: this.$route.path,
          query: { tag: this.filter },
        })
      } else {
        this.$router.push({
          path: this.$route.path,
          query: {},
        })
      }
    },
    formatTag(tag) {
      return tag
        .split('-')
        .map((w) => (w === 'it' ? w.toUpperCase() : w))
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
    },
  },
}
</script>
