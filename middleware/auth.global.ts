import {
  defineNuxtRouteMiddleware,
  useNuxtApp,
  navigateTo,
  useCookie,
} from "#app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const nuxtApp = useNuxtApp();
  const auth = useAuthStore(nuxtApp.$pinia);

  const accessTokenCookie = useCookie("accessToken");
  const refreshTokenCookie = useCookie("refreshToken");

  if (!auth.accessToken) {
    await auth.refreshTokens({
      accessToken: accessTokenCookie,
      refreshToken: refreshTokenCookie,
    });
  }

  const isAuthPage: boolean = ["/login", "/register"].includes(to.path);
  const isLoggedIn: boolean = !!auth.accessToken;

  if (!isLoggedIn && !isAuthPage) {
    return navigateTo("/login");
  }

  if (isLoggedIn && isAuthPage) {
    return navigateTo("/");
  }
});
