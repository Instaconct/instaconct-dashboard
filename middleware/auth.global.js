export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const user = localStorage.getItem("user");

    const isAuthPage = ["/login", "/register"].includes(to.path);

    if (!user && !isAuthPage) {
      return navigateTo("/login", { replace: true });
    }

    if (user && isAuthPage) {
      return navigateTo("/", { replace: true });
    }
  }
});
