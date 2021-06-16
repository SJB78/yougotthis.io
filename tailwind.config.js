module.exports = {
  purge: {
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'content/**/*.md',
      'assets/css/*.css',
    ],
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
}
