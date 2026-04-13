export const routerConfig = {
  home: { path: "/" },
  dashboard: { path: "/dashboard" },
  problems: {
    path: "/problems",
    execute: ({ id }: { id: string }) => `/problems/${id}`,
  },
  leaderboards: { path: "/leaderboards" },
  login: { path: "/auth/login" },
  signup: { path: "/auth/login?screen_hint=signup" },
  logOut: { path: "/auth/logout" },
  about: { path: "/about" },
  privacyPolicy: { path: "/privacy-policy" },
  termsOfService: { path: "/terms-of-service" },
};
