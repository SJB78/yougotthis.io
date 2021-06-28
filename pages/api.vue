<template>
  <div class="wrapper">
    <h1 class="page-title">You Got This API</h1>
    <div class="prose mt-12 mb-24 max-w-full">
      <p>
        The You Got This API is no longer supported. If you want to use it as
        part of a tutorial or class you can find a snapshot of it at
        <a href="https://archive.yougotthis.io/api">archive.yougotthis.io/api</a
        >. This version will work but will not have latest data added to it.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: `API ${process.env.title}`,
    }
  },
}
</script>
