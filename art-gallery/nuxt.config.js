export default {
  ssr: true,
  server: {
    host: '192.168.178.36',
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Nifty Gallery',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: "An art gallery for Nifty Island's Palm Challenge",
      },
      { name: 'format-detection', content: 'telephone=no' },
      { property: 'og:title', content: 'Nifty Gallery' },
      { property: 'og:site_name', content: 'Nifty Gallery' },
      {
        property: 'og:description',
        content: "An art gallery for Nifty Island's Palm Challenge",
      },
      { property: 'og:url', content: 'tba' },
      { property: 'og:image', content: '/logo.png' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Grandstander:wght@700&family=Signika:wght@300;400&display=swap',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['nuxt-helmet', '@nuxt/http'],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  // Tailwind Configuration
  tailwindcss: {
    configPath: '~/tailwind.config.js',
  },

  publicRuntimeConfig: {
    http: {
      browserBaseURL: '/',
    },
  },
}
