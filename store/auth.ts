import { defineStore } from "pinia";
import { useCookie } from "#app";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null as any,
    accessToken: null as string | null,
  }),

  actions: {
    async login(email: string, password: string) {
      const res = await $fetch("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      this.user = res.user;
      this.accessToken = res.accessToken;

      useCookie("accessToken").value = res.accessToken;

      localStorage.setItem("user", JSON.stringify(res.user));
    },

    async register(
      name: string,
      email: string,
      phone: string,
      password: string,
      organization: { name: string }
    ) {
      const res = await $fetch("/api/auth/register", {
        method: "POST",
        body: { name, email, phone, password, organization },
      });

      this.user = res.user;
      this.accessToken = res.accessToken;

      useCookie("accessToken").value = res.accessToken;
      localStorage.setItem("user", JSON.stringify(res.user));
    },

    logout() {
      this.user = null;
      this.accessToken = null;

      useCookie("accessToken").value = null;
      localStorage.removeItem("user");
    },

    async initUserFromLocalStorage() {
      if (process.client) {
        const user = localStorage.getItem("user");
        const accessToken = useCookie<string>("accessToken").value;

        if (user && accessToken) {
          this.user = JSON.parse(user);
          this.accessToken = accessToken;
        }
      }
    },
  },
});
