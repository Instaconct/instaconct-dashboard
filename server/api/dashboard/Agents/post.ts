export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const token = getCookie(event, "accessToken");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const body = await readBody(event);

  const response = await $fetch(`${config.public.apiBase}/user/agent`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body,
  });

  return response;
});