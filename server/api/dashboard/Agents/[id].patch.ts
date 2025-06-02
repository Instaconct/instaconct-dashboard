export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const token = getCookie(event, "accessToken");

  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    });
  }

  const id = event.context.params?.id as string;
  const body = await readBody(event);

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing user ID",
    });
  }

  return await $fetch(`${config.public.apiBase}/user/${id}`, {
    method: "PATCH",
    body,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
});
