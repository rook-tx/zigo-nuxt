// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,

  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      title: 'Home',
      titleTemplate: '%s %separator %siteName',
      templateParams: {
        siteName: 'ZIGO',
        separator: '/',
      },
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
        {
          name: 'description',
          content:
            'We are ZIGO. We are a four-piece guitar band from Kent driven by groove, existenialist angst and razor-sharp wit.',
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        {
          rel: 'apple-touch-icon',
          type: 'image/jpg',
          href: '/apple-touch-icon.jpg',
        },
        { rel: 'manifest', href: '/manifest.json' },
      ],
      script: [
        {
          async: true,
          src: 'https://www.googletagmanager.com/gtag/js?id=G-BZYDLG7H21',
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BZYDLG7H21');`,
        },
      ],
    },

    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },

  site: {
    name: 'ZIGO',
    url: 'https://www.wearezigo.com',
  },

  image: {
    quality: 80,
    formats: ['avif', 'webp' ],
    sizes: {
      // $nano: 400,
      sm: 600, // $mobile
      md: 768, // $tablet
      lg: 1024, // $notebook
      xl: 1366, // $laptop
      xxl: 1440, // $laptop-large
      '2xl': 1600, // $desktop
      // '3xl': 1920, // $ultra
    },
  },

  css: ['@/assets/styl/main.styl'],

  modules: ['@pinia/nuxt', '@nuxt/image', '@nuxt/eslint', '@nuxtjs/sitemap'],

  compatibilityDate: '2025-01-22',
})