<template>
  <header class="bg-black text-white">
    <!--<a class="wrapper p-4 pb-0 block" href="https://live.yougotthis.io">
      <div class="bg-red-600 text-white p-4 rounded flex justify-between items-center gap-4">
        <p>🎥 Watch our annual conference live this Saturday</p>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </div>
    </a>-->
    <div class="wrapper p-4 flex items-center gap-4">
      <a href="/" class="flex justify-start items-center flex-1">
        <img src="~/assets/img/fist.svg" alt="Fist logo" class="h-14" />
        <div class="ml-4 inline-block">
          <h1 class="text-2xl font-bold">You Got This</h1>
          <p class="text-sm">Let's talk about core skills</p>
        </div>
      </a>
      <button @click="themeButton.toggle">
        <svg
          v-if="$colorMode.value == 'light'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <svg
          v-if="$colorMode.value == 'dark'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </button>
    </div>
    <div
      class="bg-gradient-to-r from-pink-500 to-indigo-700 text-white header-bar"
    >
      <nav class="wrapper w-screen p-4">
        <ul class="flex flex-wrap gap-4">
          <li>
            <nuxt-link to="/events">Events</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/talks">Talk Library</nuxt-link>
          </li>
          <li>
            <a href="https://twitter.com/yougotthisconf">Twitter</a>
          </li>
        </ul>
      </nav>
    </div>
    <!-- <div class="p-4 pb-0 bg-white notice">
      <n-link
        to="/events/cyberspace"
        class="
          wrapper
          bg-pink-100
          border border-pink-200
          rounded
          p-4
          block
          text-gray-800
          flex
          justify-between
          items-center
        "
        ><span
          >Submit talks and workshops to our Jan conference until Sept 30.</span
        >
        <right-arrow class="h-4 w-4 hidden md:block" />
      </n-link>
    </div> -->
  </header>
</template>

<script>
export default {
  computed: {
    themeButton() {
      const c = this.$colorMode.value
      const text = `Enable ${c === 'light' ? 'Dark' : 'Light'} Mode`
      const toggle = () => {
        this.$colorMode.preference = c === 'light' ? 'dark' : 'light'
      }
      return { text, toggle }
    },
  },
}
</script>
