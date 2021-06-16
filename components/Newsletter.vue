<template>
  <form
    class="mt-4 sm:flex"
    action="https://buttondown.email/api/emails/embed-subscribe/yougotthisconf"
    method="post"
    target="popupwindow"
    onsubmit="window.open('https://buttondown.email/yougotthisconf', 'popupwindow')"
  >
    <input
      id="bd-email"
      aria-label="Email"
      class="
        bg-white
        px-4
        py-2
        border-gray-500 border-2
        text-lg
        flex-1
        focus:border-indigo-700
        w-full
        sm:w-auto
      "
      required
      placeholder="Enter your email"
      name="email"
    />
    <input type="hidden" name="tag" value="ygt-site" />
    <input type="hidden" value="1" name="embed" />
    <button
      type="submit"
      class="
        px-4
        py-2
        bg-indigo-700
        text-white text-lg
        w-full
        mt-2
        sm:mt-0
        sm:w-auto
        sm:ml-4
      "
    >
      Get a few updates a year
    </button>
  </form>
</template>
