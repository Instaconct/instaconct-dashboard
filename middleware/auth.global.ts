import {
  defineNuxtRouteMiddleware,
  useNuxtApp,
  navigateTo,
  useCookie,
} from "#app";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();

  if (!auth.user) {
    await auth.initUserFromLocalStorage?.();
  }

  const accessToken = useCookie<string>("accessToken").value;
  const isAuthPage = ["/login", "/register"].includes(to.path);
  const isLoggedIn = !!accessToken;

  if (!isLoggedIn && !isAuthPage) {
    return navigateTo("/login");
  }

  if (isLoggedIn && isAuthPage) {
    return navigateTo("/");
  }
});
