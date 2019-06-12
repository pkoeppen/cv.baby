const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const pkg = require('./package');

const env = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const config = require(`./config.${env}.json`);

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
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
          },
          {
            code: 'es',
            name: 'Español'
          },
          {
            code: 'fr',
            name: 'Français'
          }
        ],
        defaultLocale: 'en',
        vueI18n: {
          fallbackLocale: 'en',
          messages: {
            en: {
              onlineResumesSimplified: 'Online resumes, simplified.',
              anAllInOneSolution:
                'An all-in-one solution for CV and resume hosting.',
              summerSale: 'Summer sale!',
              abbreviationMonth: 'mo',
              forALimitedTime: 'For a limited time',
              employment: 'Employment',
              education: 'Education',
              references: 'References',
              personal: 'Personal',
              contact: 'Contact',
              present: 'present',
              renewSubscription: 'Renew Subscription',
              account: 'Account',
              help: 'Help',
              logout: 'Logout',
              login: 'Login',
              email: 'Email',
              emailIsRequired: 'Email is required',
              password: 'Password',
              passwordIsRequired: 'Password is required',
              freeTrial: 'Free Trial',
              tryCvBabyForFree: 'Try cvbaby for free',
              accountCreated: 'Account Created',
              startFreeTrial: 'Start Free Trial',
              free14DayTrialForCvBabyPro: 'Free 14-day trial for cvbaby pro',
              monthly: 'Monthly',
              yearly: 'Yearly',
              perMonth: 'per month',
              cancelAnyTime: 'cancel any time',
              unlimitedUsage: 'Unlimited usage',
              twentyFourSevenSupport: '24/7 support',
              noAds: 'No ads',
              shorterLicense: 'Shorter license',
              moreExpensive: 'More expensive',
              mostPopular: 'Most Popular',
              extendedLicense: 'Extended license',
              lessExpensive: 'Less expensive',
              trustedByOver20ThousandUsers:
                'Trusted by over 20 thousand users every month',
              whatsIncludedWithYourProSubscription:
                "What's included with your pro subscription",
              createYourOwnResume:
                'Impressed? Create your own resume with cvbaby pro'
            },
            de: {
              onlineResumesSimplified: 'Online Lebensläufe, vereinfacht.',
              anAllInOneSolution:
                'Die all-in-one Lösung für den modernen Lebenslauf.',
              summerSale: 'Sommerschlussverkauf!',
              abbreviationMonth: 'mo',
              forALimitedTime: 'Für eine begrenzte Zeit',
              employment: 'Karriere',
              education: 'Ausbildung',
              references: 'Referenzen',
              personal: 'Interessen',
              contact: 'Kontakt',
              present: 'jetzt',
              renewSubscription: 'Abo erneuern',
              account: 'Konto',
              help: 'Hilfe',
              logout: 'Abmelden',
              login: 'Anmelden',
              email: 'E-Mail-Adresse',
              emailIsRequired: 'E-Mail-Adresse ist erforderlich',
              password: 'Passwort',
              passwordIsRequired: 'Passwort ist erforderlich',
              freeTrial: 'Gratis Testen',
              tryCvBabyForFree: 'cvbaby pro gratis testen',
              accountCreated: 'Konto erstellt',
              startFreeTrial: 'Gratistest starten',
              free14DayTrialForCvBabyPro:
                'Kostenlose 14-Tage Testphase von cvbaby pro',
              monthly: 'Monatlich',
              yearly: 'Jährlich',
              perMonth: 'pro Monat',
              cancelAnyTime: 'jederzeit kündbar',
              unlimitedUsage: 'Unbegrenzte Nutzung',
              twentyFourSevenSupport: '24/7 Support',
              noAds: 'Keine Werbung',
              shorterLicense: 'Kürzere Lizenz',
              moreExpensive: 'Teurer',
              mostPopular: 'Beliebteste',
              extendedLicense: 'Erweiterte Lizenz',
              lessExpensive: 'Günstiger',
              trustedByOver20ThousandUsers:
                'Über Zwanzigtausend Benutzer vertrauen monatlich darauf',
              whatsIncludedWithYourProSubscription:
                'Was in einem Pro-Abonnement enthalten ist',
              createYourOwnResume:
                'Beeindruckt? Erstellen Sie Ihren eigenen Lebenslauf mit cvbaby pro'
            }
          }
        },
        // // Set 'seo' to false because otherwise it breaks Vuetify styles.
        // https://github.com/nuxt-community/nuxt-i18n/issues/100
        seo: false
      }
    ]
  ],
  /*
   ** Axios module configuration
   */
  axios: {
    baseURL: 'http://localhost:3001'
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
