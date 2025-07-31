// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['nuxt-seo-kit'],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
  charset: "utf-8",
  viewport: "width=device-width, initial-scale=1",
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
      crossorigin: "anonymous"
    }
  ]
}

  },
  imports: {
    dirs: ["store"],
  },
  modules: ["@nuxt/devtools", "@pinia/nuxt"],
 
  routeRules: {
    "/**": { robots: "index, follow" },
  },
  runtimeConfig: {
    public: {
      siteUrl:
        "http://localhost:8080",
      siteName: "Pixa E-Ticaret",
      siteDescription:
        "Yepyenii Bir E-Ticaret Sitesi",
      language: "tr-TR",
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000'
    },
  },
  plugins: [{ src: "~/plugins/bootstrap.client.ts", mode: "client" },{ src: "~/plugins/vercel.ts", mode: "client" }],
  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
  css: ["~/assets/styles/main.scss"],
  render: {
    csp: {
      hashAlgorithm: "sha256",
      policies: {
        "script-src": ["'self'", "*.vercel-insights.com"],
      },
      addMeta: true,
    },
  },
  devServer:{
    port: 8080,
    host:'0.0.0.0'
  }
});
