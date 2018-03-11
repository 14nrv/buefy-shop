const {
  NODE_ENV,
  ANALYZE,
  FB_DATABASE_URL,
  FB_PROJECT_ID,
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_STORAGE_BUCKET,
  FB_MESSAGE_SENDER_ID,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_URL
} = process.env

const modules = [
  '@nuxtjs/pwa'
]
const isNotProdEnv = NODE_ENV !== 'production'
isNotProdEnv && modules.push('@nuxtjs/dotenv')

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
    analyze: ANALYZE,
    vendor: [
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
  modules,
  plugins: [
    '~plugins/firebase',
    { src: '~plugins/veeValidate', ssr: false },
    { src: '~plugins/lazysizes', ssr: false }
  ],
  env: {
    FB_DATABASE_URL,
    FB_PROJECT_ID,
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_STORAGE_BUCKET,
    FB_MESSAGE_SENDER_ID,
    STRIPE_PUBLISHABLE_KEY,
    STRIPE_URL
  }
}
