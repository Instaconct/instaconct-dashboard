import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const accessTokenCookie = useCookie("accessToken");
      const refreshTokenCookie = useCookie("refreshToken");

      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      this.user = res.user;
      this.accessToken = res.accessToken;
      this.refreshToken = res.refreshToken;

      accessTokenCookie.value = res.accessToken;
      refreshTokenCookie.value = res.refreshToken;
    },

    async register(
      name: string,
      email: string,
      phone: string,
      password: string,
      organization: { name: string }
    ) {
      const accessTokenCookie = useCookie("accessToken");
      const refreshTokenCookie = useCookie("refreshToken");

      const res = await $fetch("/api/auth/register", {
        method: "POST",
        body: { name, email, phone, password, organization },
      });

      this.user = res.user;
      this.accessToken = res.accessToken;
      this.refreshToken = res.refreshToken;

      accessTokenCookie.value = res.accessToken;
      refreshTokenCookie.value = res.refreshToken;
    },

    logout() {
      const accessTokenCookie = useCookie("accessToken");
      const refreshTokenCookie = useCookie("refreshToken");

      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;

      accessTokenCookie.value = null;
      refreshTokenCookie.value = null;
    },

    async refreshTokens() {
      const accessTokenCookie = useCookie("accessToken");
      const refreshTokenCookie = useCookie("refreshToken");

      const refreshToken = refreshTokenCookie.value;
      const accessToken = accessTokenCookie.value;

      if (!refreshToken || !accessToken) {
        this.logout();
        return;
      }

      try {
        const res = await $fetch("/api/auth/refresh", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            accessToken,
            refreshToken,
          }),
        });

        this.accessToken = res.accessToken;
        accessTokenCookie.value = res.accessToken;
      } catch (error) {
        this.logout();
      }
    },
  },
});
