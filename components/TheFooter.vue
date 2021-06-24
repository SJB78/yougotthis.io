<template>
  <footer class="bg-black text-white">
    <div class="bg-gradient-to-l from-pink-500 to-indigo-700 text-white">
      <ul class="wrapper p-4 space-x-4 flex w-screen overflow-x-scroll">
        <li class="whitespace-nowrap">
          <nuxt-link to="/run">Run Your Own</nuxt-link>
        </li>
        <li class="whitespace-nowrap">
          <nuxt-link to="/photos">Photos</nuxt-link>
        </li>
        <li class="whitespace-nowrap">
          <a href="mailto:kevin@yougotthis.io">Email</a>
        </li>
        <li class="whitespace-nowrap"><a href="/feed.xml">RSS</a></li>
        <li class="whitespace-nowrap"><a href="api">API</a></li>
        <li class="whitespace-nowrap"><a href="/twitter">Twitter</a></li>
        <li class="whitespace-nowrap pr-4"><a href="/discord">Discord</a></li>
      </ul>
    </div>
    <div class="wrapper p-4">
      You Got This is a network of community conferences focused on core,
      non-technical skills coordinated by
      <a href="https://twitter.com/_phzn">Kevin Lewis</a>.
    </div>
  </footer>
</template>
