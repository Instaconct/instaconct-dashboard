export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig(event);

  const res = await $fetch(`${config.public.apiBase}/auth/refresh`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      accessToken: body.accessToken,
      refreshToken: body.refreshToken,
    }),
  });

  return res;
});
