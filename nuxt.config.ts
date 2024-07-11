export default defineNuxtConfig({
 devtools: {
					enabled: true,

					timeline: {
									enabled: true,
					},
	},

 modules: [
					"nuxt-security",
					"@nuxtjs/tailwindcss",
					"@pinia/nuxt",
	],

 security: {
					headers: {
									crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
					},
	},

 compatibilityDate: "2024-07-11",
})