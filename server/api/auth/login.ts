export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const config = useRuntimeConfig(event);

  const response = await $fetch(`${config.public.apiBase}/auth/login`, {
    method: "POST",
    body,
  });

  return response;
});
