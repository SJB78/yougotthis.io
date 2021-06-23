<template>
  <header class="bg-black text-white">
    <!-- <div class="bg-green-400 text-white p-4">
      Color mode: {{ $colorMode.value }}
    </div> -->
    <div class="wrapper p-4 flex items-center">
      <a href="/" class="flex justify-start items-center flex-1">
        <img src="~/assets/img/fist.svg" alt="Fist logo" class="h-14" />
        <div class="ml-4 inline-block">
          <h1 class="text-2xl font-bold">You Got This</h1>
          <p class="text-sm">Let's talk about core skills</p>
        </div>
      </a>
      <button class="bg-pink-500 px-3 py-1" @click="themeButton.toggle">
        {{ themeButton.text }}
      </button>
    </div>
    <div class="bg-gradient-to-r from-pink-500 to-indigo-700 text-white">
      <nav class="wrapper w-screen p-4 overflow-x-scroll">
        <ul class="flex space-x-4">
          <li class="whitespace-nowrap">
            <nuxt-link to="/events">Events</nuxt-link>
          </li>
          <li class="whitespace-nowrap">
            <nuxt-link to="/talks">Talk Library</nuxt-link>
          </li>
          <li class="whitespace-nowrap">
            <nuxt-link to="/conduct">Code of Conduct</nuxt-link>
          </li>
          <li class="whitespace-nowrap">
            <a href="/twitter">Twitter</a>
          </li>
        </ul>
      </nav>
    </div>
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
