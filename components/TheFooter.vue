<template>
  <footer class="bg-black text-white">
    <div
      class="bg-gradient-to-l from-pink-500 to-indigo-700 text-white footer-bar"
    >
      <ul class="wrapper p-4 flex gap-4 flex-wrap">
        <li>
          <nuxt-link to="/run">Run Your Own</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/photos">Photos</nuxt-link>
        </li>
        <li>
          <a href="mailto:kevin@yougotthis.io">Email</a>
        </li>
        <li><a href="/feed.xml">RSS</a></li>
        <li><a href="https://twitter.com/yougotthisconf">Twitter</a></li>
        <li><a href="https://discord.gg/Jg358Wu">Discord</a></li>
      </ul>
    </div>
    <div class="wrapper p-4">
      You Got This is a network of community conferences focused on core,
      non-technical skills coordinated by
      <a href="https://twitter.com/_phzn">Kevin Lewis</a>.
    </div>
  </footer>
</template>
