export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);

  const token = getCookie(event, "accessToken");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const response = await $fetch(`${config.public.apiBase}/ticket`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
});
