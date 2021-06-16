<template>
  <header class="bg-black text-white">
    <div class="wrapper p-4">
      <a href="/" class="flex justify-start items-center">
        <img src="~/assets/img/fist.svg" alt="Fist logo" class="h-14" />
        <div class="ml-4">
          <h1 class="text-2xl font-bold">You Got This</h1>
          <p class="text-sm">Let's talk about core skills</p>
        </div>
      </a>
    </div>
    <div class="bg-gradient-to-r from-pink-500 to-indigo-700 text-white">
      <nav class="wrapper p-4">
        <ul class="space-x-3 flex">
          <li><nuxt-link to="/events">Events</nuxt-link></li>
          <li><nuxt-link to="/talks">Talk Library</nuxt-link></li>
          <li><nuxt-link to="/conduct">Code of Conduct</nuxt-link></li>
          <li>
            <a href="/twitter">Twitter</a>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
