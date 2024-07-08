// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  vite: {
    server: {
      https: true,
    },
  },
  serverMiddleware: [
    { path: '/api/merge', handler: '~/server/middleware/ffmpeg.js' }
  ],
})
