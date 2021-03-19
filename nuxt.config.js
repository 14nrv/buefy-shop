import { description, name } from './package.json'

const {
  ANALYZE,
  FB_API_KEY,
  FB_AUTH_DOMAIN,
  FB_DATABASE_URL,
  FB_MESSAGE_SENDER_ID,
  FB_PROJECT_ID,
  FB_STORAGE_BUCKET,
  GA_ID,
  NODE_ENV,
  STRIPE_PUBLISHABLE_KEY,
  STRIPE_URL
} = process.env

const modules = []
const isNotProdEnv = NODE_ENV !== 'production'
modules.push(
  isNotProdEnv
    ? '@nuxtjs/dotenv'
    : ['@nuxtjs/google-analytics', { id: GA_ID }]
)

module.exports = {
  /*
  ** Build configuration
  */
  build: {
    postcss: { // will fix bulma warning about column
      preset: {
        features: {
          'custom-properties': false
        }
      }
    },
    analyze: ANALYZE,
    vendor: [
      'firebase/app',
      'firebase/database'
    ]
  },
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  pwa: {
    meta: {
      description,
      name
    },
    manifest: {
      description,
      name,
      short_name: name
    }
  },
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
  buildModules: [
    '@nuxtjs/pwa'
  ],
  modules,
  plugins: [
    '~plugins/firebase',
    { src: '~plugins/veeValidate', ssr: false },
    { src: '~plugins/lazysizes', ssr: false },
    { src: '~plugins/localStorage.js', ssr: false }
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
