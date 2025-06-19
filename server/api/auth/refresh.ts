export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig(event);

  const res = await $fetch(`${config.public.apiBase}/auth/refresh`, {
    method: "POST",
    body,
  });

  return res;
});
