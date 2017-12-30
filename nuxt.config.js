module.exports = {
  /*
  ** Build configuration
  */
  build: {
    postcss: [// will fix bulma warning about column
      require('postcss-cssnext')({
        features: {
          customProperties: false
        }
      })
    ],
    analyze: true,
    vendor: [
      'buefy',
      'firebase'
    ]
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {},
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Customize app manifest
  */
  manifest: {
    theme_color: '#3B8070'
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv'
  ],
  plugins: [
    '~plugins/buefy',
    '~plugins/firebase'
  ]
}
