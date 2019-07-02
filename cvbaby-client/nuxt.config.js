const _ = require('lodash');
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const translations = require('./i18n/translations');

const env = (() => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'prod';
    case 'development':
      return 'dev';
    default:
      return 'local';
  }
})();
const config = require(`./config.${env}.json`);
console.log('env:', env);

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: `cvbaby${env === 'prod' ? '' : ' - ' + env}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Simple CV hosting for the new century.'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  env: { ...config },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#2196f3' },

  /*
   ** Global CSS
   */
  css: ['~/assets/style/app.styl'],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/vuetify', '@/plugins/vuemq', '@/plugins/auth'],

  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English'
          },
          {
            code: 'de',
            name: 'Deutsch'
          }
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: _.mapValues(translations, ({ en }) => en),
            de: _.mapValues(translations, ({ de }) => de)
          }
        },
        // Set 'seo' to false because otherwise it breaks Vuetify styles.
        // https://github.com/nuxt-community/nuxt-i18n/issues/100
        seo: false
      }
    ]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: config.AXIOS_BASE_URL
  },

  /*
   ** Build configuration
   */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ['~assets/style/variables.styl']
      }
    },

    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
      }
    }
  }
};
