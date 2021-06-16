export default {
  target: 'static',
  head: {
    title: 'You Got This | Core Skills Events',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: '/js/mux.js' }, { src: '/js/hls.js' }],
  },
  components: true,
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
  ],
  modules: ['@nuxt/content', '@nuxtjs/feed', '@nuxtjs/markdownit'],
  tailwindcss: {
    jit: true,
  },
  feed: [
    {
      path: '/feed.xml',
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
      async create(feed) {
        feed.options = {
          title: 'You Got This | Core Skills Events',
          description: "Let's talk about core skills",
          link: 'https://yougotthis.io/feed.xml',
        }

        const { $content } = require('@nuxt/content')
        const talks = await $content('talks').sortBy('date', 'desc').fetch()

        talks.forEach((item) => {
          const url = `https://yougotthis.io/talks/${item.slug}`
          feed.addItem({
            title: item.talk.title,
            id: url,
            link: url,
            description: item.talk.abstract,
            author: item.speakers.map((s) => s.name).join(' & '),
            pubDate: item.date,
          })
        })
      },
    },
  ],
}
