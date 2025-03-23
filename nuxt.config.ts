// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@sidebase/nuxt-auth"],
  css: ["~/assets/css/tailwind.css"],
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      title: "Crowd Funding App",
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap",
        },
      ],
    },
  },
  auth: {
    originEnvKey: "NUXT_BASE_URL",
    provider: {
      type: "local",
      endpoints: {
        signIn: {
          path: "/api/v1/sessions",
          method: "post",
        },
        signUp: {
          path: "/api/v1/users",
          method: "post",
        },
        signOut: { path: "/api/v1/sessions", method: "delete" },
        getSession: { path: "/api/v1/users/fetch", method: "get" },
      },
      token: {
        signInResponseTokenPointer: "/data/token",
        type: "Bearer",
        headerName: "Authorization",
      },
      session: {
        dataResponsePointer: "/data",
        dataType: {
          data: {
            id: "number",
            name: "string",
          }
        },
      },
      pages: {
        login: "/login",
      },
    },
  },
  runtimeConfig: {
    public: {
      apiBase: "http://localhost:8080",
    },
  },
});
